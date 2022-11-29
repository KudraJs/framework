import { Generator, Kudra } from "@kudra/nuxt";
import path from "path";
import { actionTree, createMapper, getAccessorType, getterTree, mutationTree } from "typed-vuex";
import { VuexGeneratorOptions } from "./options";

const META_PATH = "@kudra/vuex-generator";

export class VuexGenerator extends Generator<VuexGeneratorOptions> {
  constructor(kudra: Kudra, options: VuexGeneratorOptions) {
    super(kudra, options);
    this.typeWriter.addGlobalDeclaration(
      {
        name: "defineStore",
        type: `typeof import('typed-vuex')['getAccessorType']`,
      },
      getAccessorType
    );
    this.typeWriter.addGlobalDeclaration(
      {
        name: "defineGetters",
        type: `typeof import('typed-vuex')['getterTree']`,
      },
      getterTree
    );
    this.typeWriter.addGlobalDeclaration(
      {
        name: "defineMutations",
        type: `typeof import('typed-vuex')['mutationTree']`,
      },
      mutationTree
    );
    this.typeWriter.addGlobalDeclaration(
      {
        name: "defineActions",
        type: `typeof import('typed-vuex')['actionTree']`,
      },
      actionTree
    );
    this.typeWriter.addGlobalDeclaration(
      {
        name: "defineMapper",
        type: `typeof import('typed-vuex')['createMapper']`,
      },
      createMapper
    );
  }

  onReady(): void {
    // If the store is not activated, then warn the user and return
    if (!this.nuxtOptions.store) {
      this.logger.warn(
        "Vuex is not activated in your Nuxt project. Please activate by placing a file in the store directory. Skipping Vuex type-generation."
      );
      return;
    }

    // Auto-load the TypedVuex Module
    const typedVuexModule = this.nuxt.moduleContainer.requiredModules["nuxt-typed-vuex"];
    if (!typedVuexModule && this.options.autoLoadTypedVuex) {
      // Add nuxt-typed-vuex
      this.nuxt.moduleContainer.addModule("nuxt-typed-vuex", true);
    }

    // Add the store.d.ts file
    const storePath = this.nuxt.resolver.resolveAlias(this.nuxtOptions.dir.store);
    const relativePath = this.resolver.resolveRelative(storePath);
    const templateFile = path.resolve(__dirname, "../templates", "vuex.d.ts");

    this.typeWriter.createTemplateFile(templateFile, this.options.filename, {
      storeDir: relativePath,
    });
  }
}
