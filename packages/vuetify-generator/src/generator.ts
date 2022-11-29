import { ComponentGenerator } from "@kudra/component-generator";
import { Generator, Kudra } from "@kudra/nuxt";
import path from "path";
import { StructureKind } from "ts-morph";
import { VuetifyGeneratorOptions } from "./options";

const META_PATH = "@kudra/vuetify-generator";

export class VuetifyGenerator extends Generator<VuetifyGeneratorOptions> {
  constructor(kudra: Kudra, options: VuetifyGeneratorOptions) {
    super(kudra, options);
    // Find the @kudra/component-generator generator
    const componentGenerator = kudra.generators.find((generator) => generator instanceof ComponentGenerator) as
      | ComponentGenerator
      | undefined;

    if (!componentGenerator) {
      throw new Error(
        "Could not find the @kudra/component-generator generator. Make sure you have it installed and that you have added it before the @kudra/vuetify-generator generator."
      );
    }

    this.generateLibTypes(componentGenerator);
    this.generateConfigTypes();
  }

  onReady() {
    // Auto-load the Vuetify Module
    const vuetifyModule = this.nuxt.moduleContainer.requiredModules["@nuxtjs/vuetify"];
    if (!vuetifyModule && this.options.autoLoadVuetify) {
      this.nuxt.moduleContainer.addModule("@nuxtjs/vuetify", true);
    }
  }

  private generateLibTypes(componentGenerator: ComponentGenerator) {
    // Get all the export keys from the components file
    const components = Object.keys(require("./components"));

    components.forEach((component) => {
      componentGenerator.addComponentStructure({
        kind: StructureKind.PropertySignature,
        name: component,
        type: `typeof import("vuetify/lib")["${component}"]`,
      });
    });

    const templateFile = path.resolve(__dirname, "../templates", "vuetify.tmpl");
    this.typeWriter.createTemplateFile(templateFile, this.options.vuetifyLibName, {
      META_PATH,
      componentKeys: components.join(","),
    });
  }

  private generateConfigTypes() {
    const nuxtConfigPath = this.nuxt.resolver.resolveAlias("nuxt.config");
    const relativePath = this.resolver.resolveRelative(nuxtConfigPath);

    const templateFile = path.resolve(__dirname, "../templates", "vuetify-config.tmpl");
    this.typeWriter.createTemplateFile(templateFile, this.options.vuetifyConfigName, {
      META_PATH,
      nuxtConfigPath: relativePath,
    });
  }
}
