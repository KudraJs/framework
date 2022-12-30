import Components from "@kudra/component-generator";
import { defineNuxtConfig } from "@kudra/nuxt";
import Plugins from "@kudra/plugin-generator";
import Utilities from "@kudra/utilities-generator";
import Vuetify from "@kudra/vuetify-generator";
import Vuex from "@kudra/vuex-generator";
import colors from "vuetify/es5/util/colors";

const demoAsyncTimout = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export default defineNuxtConfig(async () => ({
  srcDir: "client/",
  buildDir: "client/.nuxt",
  components: await demoAsyncTimout(),
  kudra: {
    outputDir: "client/kudra",
    generators: [Utilities(), Components(), Plugins(), Vuex(), Vuetify()],
  },
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          tertiary: colors.purple.darken2,
        },
        light: {
          tertiary: colors.purple.darken2,
        },
      },
    },
  },
}));
