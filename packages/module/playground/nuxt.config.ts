import { NuxtConfig } from "@nuxt/types";
import Kudra from "../src";
import DemoGenerator from "./generators/demo";

export default <NuxtConfig>{
  components: true,
  buildModules: ["@nuxt/typescript-build", Kudra],
  kudra: {
    generators: [DemoGenerator({})],
  },
};
