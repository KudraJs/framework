import { defineGenerator } from "@kudra/nuxt";
import { VuexGenerator } from "./generator";
import { defaultOptions, VuexGeneratorOptions } from "./options";

export default defineGenerator<Partial<VuexGeneratorOptions>>((kudra, options) => {
  const opts = { ...defaultOptions, ...options };

  return new VuexGenerator(kudra, opts);
});
