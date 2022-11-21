import ComponentGenerator from "@kudra/component-generator";
import { NuxtConfig } from "@nuxt/types";

export default <NuxtConfig>{
  components: true,
  buildModules: ["@nuxt/typescript-build", "@kudra/nuxt"],
  kudra: {
    useDefaultGenerators: false,
    generators: [
      ComponentGenerator({
        name: "Testing Name",
      }),
    ],
  },
};
