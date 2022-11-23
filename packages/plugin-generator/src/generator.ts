import { BuildTemplatesParams, Generator, Kudra, Plugin } from "@kudra/nuxt";
import builder from "@nuxt/builder";
import { extname, resolve } from "path";
import { StructureKind } from "ts-morph";
import { PluginGeneratorOptions } from "./options";
import { definePlugin } from "./runtime";

export class PluginGenerator extends Generator<PluginGeneratorOptions> {
  private plugins: Plugin[] = [];

  constructor(options: PluginGeneratorOptions, kudra: Kudra) {
    super(options, kudra);
    this.logger.info("Demo Generator Initialized");

    // Make the definePlugin function available to the global scope
    this.typeWriter.addGlobalDeclaration(
      {
        name: "definePlugin",
        type: `typeof import('@kudra/plugin-generator')['definePlugin']`,
      },
      definePlugin
    );
  }

  private generatePluginTypes(): void {
    const srcFile = this.typeWriter.createSourceFile(this.options.filename);

    const { ssr, client }: { ssr: string[]; client: string[] } = {
      ssr: [],
      client: [],
    };

    const buildInjectionTypes = (filepath: string) => {
      return `InjectionType<typeof import("${filepath}")["default"]>`;
    };

    for (const plugin of this.plugins) {
      switch (plugin.mode) {
        case "client":
          client.push(buildInjectionTypes(plugin.src));
          break;
        case "server":
          ssr.push(buildInjectionTypes(plugin.src));
          break;
        default:
          client.push(buildInjectionTypes(plugin.src));
          ssr.push(buildInjectionTypes(plugin.src));
      }
    }

    const clientInjectionStr = client.length > 0 ? client.join("&\n") : "{}";
    const ssrInjectionStr = ssr.length > 0 ? ssr.join("&\n") : "{}";

    srcFile.addStatements([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: "@kudra/plugin-generator",
        namedImports: ["InjectionType"],
      },
      {
        kind: StructureKind.TypeAlias,
        name: "NuxtAppClientInjection",
        isExported: true,
        type: clientInjectionStr,
      },
      {
        kind: StructureKind.Module,
        name: `'vue/types/vue'`,
        hasDeclareKeyword: true,
        statements: [
          {
            kind: StructureKind.Interface,
            name: "Vue",
            extends: ["NuxtAppClientInjection"],
          },
        ],
      },
      {
        kind: StructureKind.TypeAlias,
        name: "NuxtAppSSRInjection",
        isExported: true,
        type: ssrInjectionStr,
      },
      {
        kind: StructureKind.Module,
        name: `'@nuxt/types'`,
        hasDeclareKeyword: true,
        statements: [
          {
            kind: StructureKind.Interface,
            name: "NuxtAppOptions",
            extends: ["NuxtAppSSRInjection"],
          },
          {
            kind: StructureKind.Interface,
            name: "Context",
            properties: [
              {
                name: `$${this.options.injectionKey}`,
                type: "NuxtAppSSRInjection",
              },
            ],
          },
        ],
      },
      {
        kind: StructureKind.ExportDeclaration,
      },
    ]);
    srcFile.saveSync();
  }

  onBuildBefore(builder: builder, buildOptions: any): void {
    this.nuxt.moduleContainer.addPlugin({
      fileName: "kudra/plugin.js",
      src: resolve(__dirname, "../templates", "plugin.js"),
      options: {
        injectKey: this.options.injectionKey,
      },
    });
  }

  onBuildTemplates(params: BuildTemplatesParams): void {
    const buildDir = this.nuxtOptions.buildDir;
    const plugins: Plugin[] = [];

    for (const plugin of params.templateVars.plugins) {
      const extension = extname(plugin.src);

      // If the plugin is a subpath of the build directory(.nuxt), remove it
      if (plugin.src.startsWith(buildDir)) {
        continue;
      }

      // if there is no file extension warn the user
      if (!extension) {
        const warning = `Plugin ${plugin.src} has no file extension. Specify one to hide this warning. Skipping type-generation for plugin.`;
        this.logger.warn(warning);
        continue;
      }

      // If the plugin is not a .ts file skip it
      if (extension !== ".ts") {
        continue;
      }

      // Before adding the plugin to the prepared plugins array, we need to
      // remove the file extension from the plugin src
      plugins.push({
        ...plugin,
        src: this.resolver.resolveRelative(plugin.src.replace(extension, "")),
      });
    }

    this.plugins = plugins;
    this.generatePluginTypes();
  }

  onBuildDone(builder: builder): void {
    this.generatePluginTypes();
  }
}
