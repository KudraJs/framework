import { Context } from "@nuxt/types";
import { LiteralUnion } from "type-fest";
import { PropType as VuePropType } from "vue";

declare global {
  export type PropType<T> = VuePropType<T>;
}

// util.d.ts
export type NuxtMiddlewareFN = (ctx: Context, cb: Function) => Promise<void> | void;
export type Middleware<T extends string, Strict extends boolean = false> = Strict extends true
  ? T | T[] | NuxtMiddlewareFN
  : LiteralUnion<T, string> | LiteralUnion<T, string>[] | NuxtMiddlewareFN;

export type LayoutFN<T> = (ctx: Context) => T;
export type Layout<T extends string, Strict extends boolean = false> = Strict extends true
  ? T | LayoutFN<T>
  : LiteralUnion<T, string> | LayoutFN<LiteralUnion<T, string>>;

export * from "./functions/defineComponent";
export * from "./functions/defineLayout";
export * from "./functions/defineMiddleware";
export * from "./functions/definePage";
