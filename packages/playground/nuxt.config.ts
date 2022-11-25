import ComponentGenerator from "@kudra/component-generator";
import PluginGenerator from "@kudra/plugin-generator";
import UtilitiesGenerator, { defineNuxtConfig } from "@kudra/utilities-generator";
import VuexGenerator from "@kudra/vuex-generator";

export default defineNuxtConfig({
  components: true,
  buildModules: ["@nuxt/typescript-build", "@kudra/nuxt", "nuxt-typed-vuex"],
  plugins: ["~/plugins/foo.ts", "~/plugins/catFact.ts"],
  build: {
    transpile: ["@kudra/component-generator", "@kudra/nuxt", "@kudra/plugin-generator"],
  },
  kudra: {
    generators: [ComponentGenerator({}), PluginGenerator({}), UtilitiesGenerator({}), VuexGenerator({})],
  },
});
