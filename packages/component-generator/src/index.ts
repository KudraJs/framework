import { defineGenerator } from "@kudra/nuxt";
import { ComponentGenerator } from "./generator";
import { ComponentGeneratorOptions, defaultOptions } from "./options";

export default defineGenerator<Partial<ComponentGeneratorOptions>>((kudra, options) => {
  const opts = { ...defaultOptions, ...options };
  return new ComponentGenerator(kudra, opts);
});

export * from "./generator";
export * from "./runtime";
