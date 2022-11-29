import { Options as NuxtVuetifyOptions } from "@nuxtjs/vuetify";
import { Object } from "ts-toolbelt";
import { LiteralUnion } from "type-fest";
import { ThemeOptions, VuetifyThemeItem } from "vuetify/types/services/theme";

declare module "@nuxtjs/vuetify" {
  interface Options {
    theme?: ThemeOptions;
  }
}

export interface DefaultVuetifyTheme {
  primary: VuetifyThemeItem;
  secondary: VuetifyThemeItem;
  accent: VuetifyThemeItem;
  info: VuetifyThemeItem;
  warning: VuetifyThemeItem;
  error: VuetifyThemeItem;
  success: VuetifyThemeItem;
  anchor?: string | number;
}

export interface DefineConfig {}

type DefineVuetifyOptions = DefineConfig extends { vuetify: infer options }
  ? options extends NuxtVuetifyOptions
    ? options
    : NuxtVuetifyOptions
  : NuxtVuetifyOptions;

type DefinedVuetifyTheme = DefineVuetifyOptions extends { theme: { themes: infer T } }
  ? T extends ThemeOptions["themes"]
    ? T
    : ThemeOptions["themes"]
  : ThemeOptions["themes"];

type DefinedVuetifyLightTheme = DefinedVuetifyTheme extends { light: infer theme }
  ? theme & DefaultVuetifyTheme
  : DefaultVuetifyTheme;
type DefinedVuetifyDarkTheme = DefinedVuetifyTheme extends { dark: infer theme }
  ? theme & DefaultVuetifyTheme
  : DefaultVuetifyTheme;

type ThemeTypeDiff = Object.Diff<DefinedVuetifyLightTheme, DefinedVuetifyDarkTheme>;

type CombinedTheme = DefinedVuetifyLightTheme & DefinedVuetifyDarkTheme;

/** Only makes the keys of ThemeTypeDiff optional */
export type Theme = {
  [K in keyof CombinedTheme as K extends keyof ThemeTypeDiff ? never : K]: CombinedTheme[K];
};

// Map type that iterates 10 times
type DarkenKeys = "darken-1" | "darken-2" | "darken-3" | "darken-4";
type LightenKeys = "lighten-1" | "lighten-2" | "lighten-3" | "lighten-4" | "lighten-5";

type VuetifyColors =
  | "red"
  | "pink"
  | "purple"
  | "deep-purple"
  | "indigo"
  | "blue"
  | "light-blue"
  | "cyan"
  | "teal"
  | "green"
  | "light-green"
  | "lime"
  | "yellow"
  | "amber"
  | "orange"
  | "deep-orange"
  | "brown"
  | "grey"
  | "blue-grey";

type VuetifyShades = "black" | "white" | "transparent";

export type Variants<K, T extends string> = {
  [D in T as `${K & string} ${D}`]: any;
};

export type DarkenVariants = Variants<keyof Theme | VuetifyColors, DarkenKeys>;
export type LightenVariants = Variants<keyof Theme | VuetifyColors, LightenKeys>;

export type AllColors = keyof Theme | keyof DarkenVariants | keyof LightenVariants | VuetifyShades;

export type ThemeColor = LiteralUnion<AllColors, string>;

type OneToTwentyFour =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Elevation = LiteralUnion<OneToTwentyFour, number> | LiteralUnion<`${OneToTwentyFour}`, string>;
export type Cols = LiteralUnion<GridColumns, number> | LiteralUnion<`${GridColumns}` | "auto", string>;

export type AlignItems = "start" | "end" | "center" | "baseline" | "stretch" | "auto";
export type AlignContent = "start" | "center" | "end" | "space-between" | "space-around" | "stretch";
export type JustifyContent = "start" | "center" | "end" | "space-between" | "space-around";
