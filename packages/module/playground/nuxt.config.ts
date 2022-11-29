import { NuxtConfig } from "@nuxt/types";
import colors from "vuetify/es5/util/colors";
import Kudra from "../src";
import DemoGenerator from "./generators/demo";

export default <NuxtConfig>{
  components: true,
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/vuetify", Kudra],
  vuetify: {
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  kudra: {
    generators: [DemoGenerator()],
  },
};
