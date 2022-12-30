/// <reference path="../types/nuxt/core.d.ts" />
/// <reference path="../types/nuxt/builder.d.ts" />
/// <reference path="../types/nuxt/server.d.ts" />
/// <reference path="../types/nuxt/vue-renderer.d.ts" />

import { Module as ModuleContainer } from "@nuxt/core";
import { NuxtConfig } from "@nuxt/types";
import merge from "deepmerge";
import jetpack from "fs-jetpack";
import { resolve } from "path";
import { performance } from "perf_hooks";
import { PartialDeep } from "type-fest";
import { Kudra } from "./kudra";
import { defaultKudraOptions, KudraOptions } from "./kudra/options";
declare module "@nuxt/types" {
  interface Configuration {
    kudra?: PartialDeep<KudraOptions>;
  }
}
export default function (this: ModuleContainer, moduleOptions: KudraOptions) {
  const startTime = performance.now();
  const kudraOptions = merge.all([defaultKudraOptions, moduleOptions, this.options.kudra || {}]) as KudraOptions;
  const kudra = new Kudra(this, kudraOptions);

  // Check if there is a tsconfig.json file in the root of the project
  // If there is, we assume that the user is using TypeScript
  const tsConfigPath = resolve(this.options.rootDir, "tsconfig.json");
  if (jetpack.exists(tsConfigPath) !== "file") {
    throw new Error("Kudra requires a tsconfig.json file in the root of your project");
  }

  // Load the @nuxt/typescript-build module if it is not already loaded
  const typescriptModule = this.nuxt.moduleContainer.requiredModules["@nuxt/typescript-build"];
  if (!typescriptModule && kudraOptions.autoLoadTypescript) {
    this.nuxt.moduleContainer.addModule("@nuxt/typescript-build", true);
  }

  const performanceLogger = kudra.createLogger("performance");
  kudra.cleanOutputDir();
  kudra.loadGenerator(kudraOptions.generators);
  kudra.callHooks();
  kudra.generateGlobalDTS();
  const endTime = performance.now();
  const roundedTime = Math.round((endTime - startTime) * 100) / 100;
  performanceLogger.success(`Kudra Generated Types In ${roundedTime}ms`);
}

export type ConfigOptions = (() => Promise<NuxtConfig>) | NuxtConfig;

export const defineNuxtConfig = <T extends ConfigOptions>(config: T): T extends () => Promise<infer R> ? R : T => {
  const isAsync = typeof config === "function";

  // Added support for async config
  if (isAsync) {
    const asyncConfig = async () => {
      const resolvedConfig = await config();
      return defineNuxtConfig(resolvedConfig);
    };
    return asyncConfig as any;
  }

  // Add @kudra/nuxt to the buildModules array
  if (!config.buildModules) {
    config.buildModules = [];
  }
  if (!config.buildModules.includes("@kudra/nuxt")) {
    config.buildModules.push("@kudra/nuxt");
  }
  return config as any;
};

export * from "./generators";
export * from "./kudra";
