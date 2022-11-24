import { Component, Generator, Kudra } from "@kudra/nuxt";
import { extname } from "path";
import { OptionalKind, PropertySignatureStructure, StructureKind } from "ts-morph";
import { ComponentGeneratorOptions } from "./options";

export class ComponentGenerator extends Generator<ComponentGeneratorOptions> {
  private components: Component[] = [];

  constructor(options: ComponentGeneratorOptions, kudra: Kudra) {
    super(options, kudra);
    this.logger.info("Component Generator Initialized");
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

    const componentProperties: OptionalKind<PropertySignatureStructure>[] = [];

    this.components.forEach((component) => {
      // Paths cant end in ts || tsx so remove it it.
      if (extname(component.filePath) === ".ts" || extname(component.filePath) === ".tsx") {
        component.filePath = component.filePath.replace(/\.[^/.]+$/, "");
      }

      const compPath = this.resolver.resolveRelative(component.filePath);

      componentProperties.push({
        kind: StructureKind.PropertySignature,
        name: `'${component.pascalName}'`,
        type: `typeof import("${compPath}").default`,
      });

      // Add the lazy version of the component
      componentProperties.push({
        kind: StructureKind.PropertySignature,
        name: `'Lazy${component.pascalName}'`,
        type: `typeof import("${compPath}").default`,
      });
    });

    dtsFile.addStatements([
      {
        kind: StructureKind.Module,
        name: `"vue"`,
        statements: [
          {
            kind: StructureKind.Interface,
            name: "GlobalComponents",
            isExported: true,
            properties: componentProperties,
          },
        ],
      },
      {
        kind: StructureKind.ExportDeclaration,
      },
    ]);
    dtsFile.saveSync();
  }

  public onComponentsExtend(loadedComponents: Component[]): void {
    this.components = loadedComponents;
    this.generateComponentTypes();
  }
}
