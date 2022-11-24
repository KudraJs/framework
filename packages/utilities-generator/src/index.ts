import { defineGenerator } from "@kudra/nuxt";
import { UtilitiesGenerator } from "./generator";
import { defaultOptions, UtilitiesGeneratorOptions } from "./options";

export default defineGenerator<Partial<UtilitiesGeneratorOptions>>((...args) => {
  const options = Object.assign({}, defaultOptions, args[0]);
  return new UtilitiesGenerator(options, args[1]);
});

export * from "./runtime";
