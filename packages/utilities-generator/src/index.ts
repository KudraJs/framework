import { defineGenerator } from "@kudra/nuxt";
import { UtilitiesGenerator } from "./generator";
import { defaultOptions, UtilitiesGeneratorOptions } from "./options";

export default defineGenerator<Partial<UtilitiesGeneratorOptions>>((kudra, options) => {
  const opts = { ...defaultOptions, ...options };
  return new UtilitiesGenerator(kudra, opts);
});

export * from "./runtime";
