import { KudraGenerator } from "../generators";

export interface KudraOptions {
  /**
   * The output directory for the generated .d.ts files.
   *
   * @default "kudra"
   */
  outputDir: string;
  /**
   * Generators that kudra will load
   *
   * @default []
   */
  generators: Array<KudraGenerator>;
  /**
   * Path separator to use when resolving paths
   * in .d.ts files.
   * @default /
   */
  pathSeparator: string;

  /**
   * Whether or not to automatically add the @nuxt/typescript-build module to buildModules.
   * If you already have this module in your buildModules and it registered before
   * this generator, then the generator will not add it again.
   */
  autoLoadTypescript: boolean;
}

export const defaultKudraOptions: KudraOptions = {
  outputDir: "kudra",
  generators: [],
  pathSeparator: "/",
  autoLoadTypescript: true,
};
