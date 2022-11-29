import Components from "@kudra/component-generator";
import { defineNuxtConfig } from "@kudra/nuxt";
import Plugins from "@kudra/plugin-generator";
import Utilities from "@kudra/utilities-generator";
import Vuex from "@kudra/vuex-generator";
<%_ if (ui === 'vuetify') { _%>
import Vuetify from "@kudra/vuetify-generator";
import colors from 'vuetify/es5/util/colors'
<%_ } _%>

export default defineNuxtConfig({
  components: true,
  kudra: {
    generators: [
        Utilities(), 
        Components(), 
        Plugins(), 
        Vuex(), 
        <%_ if (ui === 'vuetify') { _%>
        Vuetify()
        <%_ } _%>
    ],
  },
  <%_ if (ui === 'vuetify') { _%>
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
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
  <%_ } _%>
});
