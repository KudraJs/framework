import { Module as ModuleContainer, Nuxt } from "@nuxt/core";
import { NuxtOptions } from "@nuxt/types";
import consola, { Consola } from "consola";
import { Generator, hookCallNames, KudraGenerator } from "../generators";
import { Resolver } from "../resolver";
import { KudraOptions } from "./options";

export class Kudra {
  private readonly options: KudraOptions;
  public nuxt: Nuxt;
  public generators: Generator<any>[] = [];
  private logger: Consola;
  public resolver: Resolver;

  constructor(moduleContainer: ModuleContainer, kudraOptions: KudraOptions) {
    this.nuxt = moduleContainer.nuxt;
    this.options = kudraOptions;
    this.logger = consola.withTag("kudra");
    this.resolver = new Resolver(this);
  }

  /**
   * Loads one or more generators into the kudra instance
   * @param generator The generator or generators to load
   */
  public loadGenerator(generator: KudraGenerator | KudraGenerator[]) {
    const generators = Array.isArray(generator) ? generator : [generator];
    generators.forEach((gen) => {
      const generator = gen(this);
      this.generators.push(generator);
    });
  }

  /**
   * Setups the generators defined hook methods, if they exist
   */
  public setupHooks() {
    for (const generator of this.generators) {
      for (const [key, callName] of Object.entries(hookCallNames)) {
        if (generator[key as keyof Generator<any>]) {
          this.nuxt.hook(callName, generator[key as keyof Generator<any>].bind(generator));
        }
      }
    }
  }

  /**
   * Generates a new logger with a given tag
   * @param tag A string that will be displayed next to log messages
   */
  public createLogger(tag: string) {
    return this.logger.withTag(tag);
  }

  /** The options provided in the apps nuxt.config.js/ts file */
  public get nuxtOptions(): NuxtOptions {
    return this.nuxt.options;
  }

  /** The options passed to the @kudra/nuxt module. After merged with default  */
  public get kudraOptions(): KudraOptions {
    return this.options;
  }
}
