import { defineGenerator } from "@kudra/nuxt";
import { ComponentGenerator } from "./generator";
import { ComponentGeneratorOptions, defaultOptions } from "./options";

export default defineGenerator<Partial<ComponentGeneratorOptions>>((...args) => {
  const options = Object.assign({}, defaultOptions, args[0]);
  return new ComponentGenerator(options, args[1]);
});

export * from "./runtime";
