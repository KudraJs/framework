import { Context } from "@nuxt/types";

/**
 * Clone of Plugin type provided by @nuxt/types. However,
 * it now contains an unused generic type (Injections) that allows for
 * type inference down the line.
 *
 * Inspired by nuxt 3 plugin types
 *
 */
type NuxtPlugin<T extends Injections = Injections> = (ctx: Context, inject: InjectFN) => Promise<void> | void;
type InjectFN = (key: string, value: any) => void;
type Injections = Record<string, any>;

interface PluginFN<T extends Injections = Injections> {
  (ctx: Context): Promise<void> | void | Promise<{ provide?: T }> | { provide?: T };
}

/**
 * Defines a nuxt plugin.
 */
export const definePlugin = <T extends Injections>(pluginFN: PluginFN<T>): NuxtPlugin<T> => {
  return async (ctx, inject) => {
    const injections = await pluginFN(ctx);

    // 2. Add the inject keys & values
    if (typeof injections === "object" && "provide" in injections) {
      for (const [key, value] of Object.entries(injections["provide"] || {})) {
        inject(key, value);
      }
    }
  };
};

// For the dtsFile to later import (plugins.d.ts)
export type InjectionType<A extends NuxtPlugin> = A extends NuxtPlugin<infer T> ? Decorate<T> : unknown;
type Decorate<T extends Record<string, any>> = { [K in keyof T as K extends string ? `$${K}` : never]: T[K] };
