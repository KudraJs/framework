import { defineGenerator } from "@kudra/nuxt";
import { PluginGenerator } from "./generator";
import { defaultOptions, PluginGeneratorOptions } from "./options";

export default defineGenerator<Partial<PluginGeneratorOptions>>((...args) => {
  const options = Object.assign({}, defaultOptions, args[0]);
  return new PluginGenerator(options, args[1]);
});

export * from "./runtime";
