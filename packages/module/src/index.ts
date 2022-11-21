/// <reference path="types/nuxt/core.d.ts" />
/// <reference path="types/nuxt/builder.d.ts" />
/// <reference path="types/nuxt/server.d.ts" />
/// <reference path="types/nuxt/vue-renderer.d.ts" />

import { Module as ModuleContainer } from "@nuxt/core";
import merge from "deepmerge";
import { PartialDeep } from "type-fest";
import { Kudra } from "./kudra";
import { defaultKudraOptions, KudraOptions } from "./kudra/options";

declare module "@nuxt/types" {
  interface Configuration {
    kudra?: PartialDeep<KudraOptions>;
  }
}

export default function (this: ModuleContainer, moduleOptions: KudraOptions) {
  const kudraOptions = merge.all([defaultKudraOptions, moduleOptions, this.options.kudra || {}]) as KudraOptions;
  const kudra = new Kudra(this, kudraOptions);

  kudra.loadGenerator(kudraOptions.generators);

  kudra.setupHooks();
}

export * from "./generators";
export * from "./kudra";
