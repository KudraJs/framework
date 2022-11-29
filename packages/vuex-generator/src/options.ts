export interface VuexGeneratorOptions {
  /**
   * The name of the emitted .d.ts file
   * @default store
   */
  filename: string;
  /**
   * Whether or not to automatically add the nuxt-typed-vuex module to buildModules.
   * If you already have this module in your buildModules then the generator will not add it again.
   * @default true
   */
  autoLoadTypedVuex: boolean;
}

export const defaultOptions: VuexGeneratorOptions = {
  filename: "store",
  autoLoadTypedVuex: true,
};
