import { defineGenerator } from "@kudra/nuxt";
import { PluginGenerator } from "./generator";
import { defaultOptions, PluginGeneratorOptions } from "./options";

export default defineGenerator<Partial<PluginGeneratorOptions>>((kudra, options) => {
  const opts = { ...defaultOptions, ...options };
  return new PluginGenerator(kudra, opts);
});

export * from "./runtime";
