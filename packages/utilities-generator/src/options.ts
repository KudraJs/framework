export interface UtilitiesGeneratorOptions {
  /**
   * TODO Document this
   * @default true
   */
  strict: boolean;
  /**
   * The filename for the emitted .d.ts file
   * @default util
   */
  filename: string;
}

export const defaultOptions: UtilitiesGeneratorOptions = {
  strict: true,
  filename: "util",
};
