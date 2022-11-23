import ComponentGenerator from "@kudra/component-generator";
import PluginGenerator from "@kudra/plugin-generator";
import { NuxtConfig } from "@nuxt/types";

export default <NuxtConfig>{
  components: true,
  buildModules: ["@nuxt/typescript-build", "@kudra/nuxt"],
  plugins: ["~/plugins/foo.ts", "~/plugins/catFact.ts"],
  build: {
    transpile: ["@kudra/component-generator", "@kudra/nuxt", "@kudra/plugin-generator"],
  },
  kudra: {
    generators: [ComponentGenerator({}), PluginGenerator({})],
  },
};
