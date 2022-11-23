export interface ComponentGeneratorOptions {
  /**
   * The name of the emitted .d.ts file
   * @default global-components
   */
  filename: string;
}

export const defaultOptions: ComponentGeneratorOptions = {
  filename: "global-components",
};
