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
}

export const defaultKudraOptions: KudraOptions = {
  outputDir: "kudra",
  generators: [],
  pathSeparator: "/",
};
