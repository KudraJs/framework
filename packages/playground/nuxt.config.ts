import ComponentGenerator from "@kudra/component-generator";
import PluginGenerator from "@kudra/plugin-generator";
import UtilitiesGenerator, { defineNuxtConfig } from "@kudra/utilities-generator";

export default defineNuxtConfig({
  components: true,
  buildModules: ["@nuxt/typescript-build", "@kudra/nuxt"],
  plugins: ["~/plugins/foo.ts", "~/plugins/catFact.ts"],
  build: {
    transpile: ["@kudra/component-generator", "@kudra/nuxt", "@kudra/plugin-generator"],
  },
  kudra: {
    generators: [ComponentGenerator({}), PluginGenerator({}), UtilitiesGenerator({})],
  },
});
