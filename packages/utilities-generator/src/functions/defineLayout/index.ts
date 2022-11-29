import { HasDefined } from "vue/types/common";
import { ComponentOptionsMixin, ComputedOptions, MethodOptions } from "vue/types/v3-component-options";
import { ComponentPropsOptions } from "vue/types/v3-component-props";
import { DefineComponent } from "vue/types/v3-define-component";
import { EmitsOptions } from "vue/types/v3-setup-context";

import { ComponentOptionsWithArrayProps, ComponentOptionsWithoutProps, ComponentOptionsWithProps } from "./options";

export interface DefineLayoutOptions {}

/**
 * overload 1: object format with no props
 */
export declare function defineLayout<
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
    DefineLayoutOptions
): DefineComponent<{}, RawBindings, D, C, M, Mixin, Extends, Emits>;

/**
 * overload 2: object format with array props declaration
 * props inferred as `{ [key in PropNames]?: any }`
 *
 * return type is for Vetur and TSX support
 */
export declare function defineLayout<
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
    DefineLayoutOptions
): DefineComponent<Readonly<{ [key in PropNames]?: any }>, RawBindings, D, C, M, Mixin, Extends, Emits>;

/**
 * overload 3: object format with object props declaration
 *
 * see `ExtractPropTypes` in './componentProps.ts'
 */
export declare function defineLayout<
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
  options: HasDefined<Props> extends true
    ? { functional?: never } & ComponentOptionsWithProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, Emits, EmitsNames, Props>
    : { functional?: never } & ComponentOptionsWithProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, Emits, EmitsNames> &
        DefineLayoutOptions
): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, Emits>;
