// TODO Generator
// Added @nuxtjs/vuetify as peer dependency
// Check if the tsconfig contains the vuetify module
import { defineGenerator } from "@kudra/nuxt";
import { VuetifyGenerator } from "./generator";
import { defaultOptions, VuetifyGeneratorOptions } from "./options";

export default defineGenerator<Partial<VuetifyGeneratorOptions>>((kudra, options) => {
  const opts = { ...defaultOptions, ...options };
  return new VuetifyGenerator(kudra, opts);
});

export * from "./components";
export * from "./runtime";
