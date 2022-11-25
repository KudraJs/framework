import { defineGenerator } from "@kudra/nuxt";
import { VuexGenerator } from "./generator";
import { defaultOptions, VuexGeneratorOptions } from "./options";

export default defineGenerator<Partial<VuexGeneratorOptions>>((...args) => {
  const options = Object.assign({}, defaultOptions, args[0]);
  return new VuexGenerator(options, args[1]);
});
