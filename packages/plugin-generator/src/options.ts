export interface PluginGeneratorOptions {
  /**
   * The name of the emitted .d.ts file
   * @default plugins
   */
  filename: string;
  /**
   * The name of the key used to access
   * plugins in ssr context
   * @default plugins
   */
  injectionKey: string;
}

export const defaultOptions: PluginGeneratorOptions = {
  filename: "plugins",
  injectionKey: "plugins",
};
