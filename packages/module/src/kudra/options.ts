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
}

export const defaultKudraOptions: KudraOptions = {
  outputDir: "kudra",
  generators: [],
};
