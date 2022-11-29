import { Component, Generator, Kudra } from "@kudra/nuxt";
import { extname } from "path";
import { StructureKind } from "ts-morph";
import { ComponentGeneratorOptions } from "./options";
import { GlobalComponentStructure } from "./runtime";

export class ComponentGenerator extends Generator<ComponentGeneratorOptions> {
  private nuxtComponentStructures: GlobalComponentStructure[] = [];
  private addedComponentStructure: GlobalComponentStructure[] = [];

  constructor(kudra: Kudra, options: ComponentGeneratorOptions) {
    super(kudra, options);
    this.validateConfig();
  }

  /**
   * Validates that the nuxt config has global components enabled
   */
  private validateConfig() {
    if (!this.nuxtOptions.components) {
      this.logger.warn("You must set { components: true } in your nuxt config, to use the component loader.");
    }
  }

  /**
   * Generates the global-components.d.ts file and adds global components to it.
   */
  private generateComponentTypes() {
    const dtsFile = this.typeWriter.createSourceFile(this.options.filename);

    dtsFile.addStatements([
      {
        kind: StructureKind.Module,
        name: `"vue"`,
        statements: [
          {
            kind: StructureKind.Interface,
            name: "GlobalComponents",
            isExported: true,
            properties: [...this.nuxtComponentStructures, ...this.addedComponentStructure],
          },
        ],
      },
      {
        kind: StructureKind.ExportDeclaration,
      },
    ]);
    dtsFile.saveSync();
  }

  public addComponentStructure(componentStructure: GlobalComponentStructure): void {
    this.addedComponentStructure.push(componentStructure);
  }

  public onComponentsExtend(loadedComponents: Component[]): void {
    const nuxtComponentStructures: GlobalComponentStructure[] = [];

    loadedComponents.forEach((component) => {
      // Paths cant end in ts || tsx so remove it it.
      if (extname(component.filePath) === ".ts" || extname(component.filePath) === ".tsx") {
        component.filePath = component.filePath.replace(/\.[^/.]+$/, "");
      }

      const compPath = this.resolver.resolveRelative(component.filePath);

      nuxtComponentStructures.push({
        kind: StructureKind.PropertySignature,
        name: `'${component.pascalName}'`,
        type: `typeof import("${compPath}").default`,
      });

      // Add the lazy version of the component
      nuxtComponentStructures.push({
        kind: StructureKind.PropertySignature,
        name: `'Lazy${component.pascalName}'`,
        type: `typeof import("${compPath}").default`,
      });
    });

    this.nuxtComponentStructures = nuxtComponentStructures;
    this.generateComponentTypes();
  }
}
