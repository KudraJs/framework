import { NuxtConfig } from "@nuxt/types";
import Kudra from "../src";

export default <NuxtConfig>{
  components: true,
  buildModules: ["@nuxt/typescript-build", Kudra],
  kudra: {
    generators: [],
  },
};
