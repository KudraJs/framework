import { Consola } from "consola";
import { resolve } from "path";
import { Kudra } from "../kudra";

export class Resolver {
  private kudra: Kudra;
  private logger: Consola;

  constructor(kudra: Kudra) {
    this.kudra = kudra;
    this.logger = kudra.createLogger(this.constructor.name);
    this.logger.info("Resolver initialized !!!");
  }

  /**
   * The absolute path to the output directory specified in the
   * nuxt config -> kudra -> outputDir.
   */
  public get outDir(): string {
    return resolve(this.kudra.nuxtOptions.rootDir, this.kudra.kudraOptions.outputDir);
  }
}
