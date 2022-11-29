export interface VuetifyGeneratorOptions {
  /**
   * The name of the emitted .d.ts file
   * @default vuetify-lib
   */
  vuetifyLibName: string;
  /**
   * The name of the emitted .d.ts file
   * @default vuetify-config
   */
  vuetifyConfigName: string;
  /**
   * Whether or not to automatically add the @nuxtjs/vuetify module to buildModules.
   * If you already have this module in your buildModules and it registered before
   * this generator, then the generator will not add it again.
   * @default true
   */
  autoLoadVuetify: boolean;
}

export const defaultOptions: VuetifyGeneratorOptions = {
  vuetifyLibName: "vuetify-lib",
  vuetifyConfigName: "vuetify-config",
  autoLoadVuetify: true,
};
