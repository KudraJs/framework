import { Context } from "@nuxt/types";
import { HasDefined } from "vue/types/common";
import { ComponentOptionsMixin, ComputedOptions, MethodOptions } from "vue/types/v3-component-options";
import { ComponentPropsOptions } from "vue/types/v3-component-props";
import { DefineComponent } from "vue/types/v3-define-component";
import { EmitsOptions } from "vue/types/v3-setup-context";

import { ComponentOptionsWithArrayProps, ComponentOptionsWithoutProps, ComponentOptionsWithProps } from "../v3-component-options";

export interface DefinePageOptions<RawBindings> {
  asyncData?: (this: undefined, ctx: Context) => Promise<RawBindings> | RawBindings | Promise<void> | void;
}

/**
 * overload 1: object format with no props
 */
export declare function definePage<
  RawBindings,
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  Emits extends EmitsOptions = {},
  EmitsNames extends string = string
>(
  options: { functional?: never } & ComponentOptionsWithoutProps<{}, RawBindings, D, C, M, Mixin, Extends, Emits, EmitsNames> &
    DefinePageOptions<RawBindings>
): DefineComponent<{}, RawBindings, D, C, M, Mixin, Extends, Emits>;

/**
 * overload 2: object format with array props declaration
 * props inferred as `{ [key in PropNames]?: any }`
 *
 * return type is for Vetur and TSX support
 */
export declare function definePage<
  PropNames extends string,
  RawBindings = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  Emits extends EmitsOptions = {},
  EmitsNames extends string = string,
  PropsOptions extends ComponentPropsOptions = ComponentPropsOptions
>(
  options: { functional?: never } & ComponentOptionsWithArrayProps<PropNames, RawBindings, D, C, M, Mixin, Extends, Emits, EmitsNames> &
    DefinePageOptions<RawBindings>
): DefineComponent<Readonly<{ [key in PropNames]?: any }>, RawBindings, D, C, M, Mixin, Extends, Emits>;

/**
 * overload 3: object format with object props declaration
 *
 * see `ExtractPropTypes` in './componentProps.ts'
 */
export declare function definePage<
  Props,
  RawBindings = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  Emits extends EmitsOptions = {},
  EmitsNames extends string = string,
  PropsOptions extends ComponentPropsOptions = ComponentPropsOptions
>(
  options: (HasDefined<Props> extends true
    ? { functional?: never } & ComponentOptionsWithProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, Emits, EmitsNames, Props>
    : { functional?: never } & ComponentOptionsWithProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, Emits, EmitsNames>) &
    DefinePageOptions<RawBindings>
): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, Emits>;
