import { Module as ModuleContainer, Nuxt } from "@nuxt/core";
import { NuxtOptions } from "@nuxt/types";
import consola, { Consola } from "consola";
import jetpack from "fs-jetpack";
import { resolve } from "path";
import { ModuleDeclarationKind, StatementStructures, StructureKind, VariableDeclarationKind } from "ts-morph";
import webpack from "webpack";
import { Generator, hookCallNames, KudraGenerator } from "../generators";
import { Resolver } from "../resolver";
import { TypeWriter } from "../type-writer";
import { KudraOptions } from "./options";
export class Kudra {
  private readonly options: KudraOptions;
  public nuxt: Nuxt;
  public generators: Generator<any>[] = [];
  private logger: Consola;
  public resolver: Resolver;
  public typeWriter: TypeWriter;

  constructor(moduleContainer: ModuleContainer, kudraOptions: KudraOptions) {
    this.nuxt = moduleContainer.nuxt;
    this.options = kudraOptions;
    this.logger = consola.withTag("kudra");
    this.resolver = new Resolver(this);
    this.typeWriter = new TypeWriter(this);
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
  public callHooks() {
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

  /**
   * Cleans the outputDir of all it's files and folders
   */
  public cleanOutputDir() {
    const outputDir = this.outDir;
    if (!outputDir) return;
    jetpack.remove(outputDir);
  }

  public generateGlobalDTS() {
    // If there isn't any global declarations, don't bother writing the file
    if (this.typeWriter.globalDeclarations.length <= 0) return;

    const dtsFile = this.typeWriter.createSourceFile("global.d.ts");
    const statements: StatementStructures[] = [];

    this.typeWriter.globalDeclarations.forEach((declaration) => {
      statements.push({
        kind: StructureKind.VariableStatement,
        declarationKind: VariableDeclarationKind.Const,
        declarations: [declaration.typeDeclaration],
      });

      if (declaration.webpackDefinePlugin) {
        this.nuxt.options.build.plugins!.push(
          // @ts-ignore
          new webpack.DefinePlugin(declaration.webpackDefinePlugin)
        );
      }
    });

    dtsFile.addStatements([
      {
        kind: StructureKind.Module,
        name: "global",
        declarationKind: ModuleDeclarationKind.Global,
        hasDeclareKeyword: true,
        statements,
      },
      {
        kind: StructureKind.ExportDeclaration,
      },
    ]);

    dtsFile.saveSync();
  }

  /**
   * The absolute path to the output directory specified in the
   * nuxt config kudra options.
   */
  public get outDir(): string {
    return resolve(this.nuxtOptions.rootDir, this.kudraOptions.outputDir);
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
