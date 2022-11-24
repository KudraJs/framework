import { Data, LooseRequired, UnionToIntersection } from "vue/types/common";
import { ComponentOptions as Vue2ComponentOptions } from "vue/types/options";
import { ComponentOptionsMixin, ComputedOptions, MethodOptions, SetupFunction } from "vue/types/v3-component-options";
import { ComponentPropsOptions, ExtractDefaultPropTypes, ExtractPropTypes } from "vue/types/v3-component-props";
import { CreateComponentPublicInstance } from "vue/types/v3-component-public-instance";
import { EmitsOptions } from "vue/types/v3-setup-context";
import { Vue } from "vue/types/vue";
import { DefineLayoutOptions, DefinePageOptions } from "./runtime";

// Import from vue/types/v3-component-options.d.ts because it was not exported
export type ExtractOptionProp<T> = T extends KudraComponentOptionsBase<
  infer P, // Props
  any, // RawBindings
  any, // D
  any, // C
  any, // M
  any, // Mixin
  any, // Extends
  any, // EmitsOptions
  any // Defaults
>
  ? unknown extends P
    ? {}
    : P
  : {};

// Generate union of keys from definePageOptions
type OverrideKeys = keyof DefinePageOptions<any> | keyof DefineLayoutOptions;

// prettier-ignore
export interface KudraComponentOptionsBase<
    Props,
    RawBindings,
    D,
    C extends ComputedOptions,
    M extends MethodOptions,
    Mixin extends ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin,
    Emits extends EmitsOptions,
    EmitNames extends string = string,
    Defaults = {}
> extends Omit<Vue2ComponentOptions<Vue, D, M, C,Props>,'data' | 'computed' | 'methods' | 'setup' | 'props' | 'mixins' | 'extends'  | OverrideKeys> {
  // allow any options
  [key: string]: any
  
  // prettier-ignore
  // rewrite options api types
  data?: (this: CreateComponentPublicInstance<Props, {}, {}, {}, M, Mixin, Extends>, vm: CreateComponentPublicInstance<Props, {}, {}, {}, M, Mixin, Extends>) => D
  computed?: C
  methods?: M
  mixins?: Mixin[]
  extends?: Extends
  emits?: (Emits | EmitNames[]) & ThisType<void>
  // prettier-ignore
  setup?: SetupFunction<Readonly<LooseRequired<Props & UnionToIntersection<ExtractOptionProp<Mixin>> & UnionToIntersection<ExtractOptionProp<Extends>>>>,RawBindings,Emits>
  __defaults?: Defaults
}

export type ComponentOptionsWithProps<
  PropsOptions = ComponentPropsOptions,
  RawBindings = Data,
  D = Data,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  Emits extends EmitsOptions = {},
  EmitsNames extends string = string,
  Props = ExtractPropTypes<PropsOptions>,
  Defaults = ExtractDefaultPropTypes<PropsOptions>
> = KudraComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, Emits, EmitsNames, Defaults> & { props?: PropsOptions } & ThisType<
    CreateComponentPublicInstance<Props, RawBindings, D, C, M, Mixin, Extends, Emits>
  >;

export type ComponentOptionsWithArrayProps<
  PropNames extends string = string,
  RawBindings = Data,
  D = Data,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  Emits extends EmitsOptions = {},
  EmitsNames extends string = string,
  Props = Readonly<{ [key in PropNames]?: any }>
> = KudraComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, Emits, EmitsNames, {}> & { props?: PropNames[] } & ThisType<
    CreateComponentPublicInstance<Props, RawBindings, D, C, M, Mixin, Extends, Emits>
  >;

export type ComponentOptionsWithoutProps<
  Props = {},
  RawBindings = Data,
  D = Data,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  Emits extends EmitsOptions = {},
  EmitsNames extends string = string
> = KudraComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, Emits, EmitsNames, {}> & { props?: undefined } & ThisType<
    CreateComponentPublicInstance<Props, RawBindings, D, C, M, Mixin, Extends, Emits>
  >;
