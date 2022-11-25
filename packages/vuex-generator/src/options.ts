export interface VuexGeneratorOptions {
  /**
   * The name of the emitted .d.ts file
   * @default store
   */
  filename: string;
}

export const defaultOptions: VuexGeneratorOptions = {
  filename: "store",
};
