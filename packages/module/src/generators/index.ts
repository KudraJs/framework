import Builder from "@nuxt/builder";
import { Nuxt } from "@nuxt/core";
import { Server } from "@nuxt/server";
import { Module as ModuleContainer, NuxtOptions } from "@nuxt/types";
import { Server as ConnectServer } from "connect";
import { Consola } from "consola";
import { Kudra } from "../kudra";
import { KudraOptions } from "../kudra/options";
import { Resolver } from "../resolver";

// prettier-ignore
export const defineGenerator = <T extends any = any>(fn: (options: T, kudra: Kudra) => Generator<T>) => {
  return (options:T) => {
      return function (kudra: Kudra) {
          return fn(options,kudra);
      }
  }
}

export type KudraGenerator = (kudra: Kudra) => Generator<any>;

export abstract class Generator<T> {
  /**
   * The apps nuxt instance
   */
  public nuxt: Nuxt;
  /**
   * The options passed to the generator from the defineGenerator function
   */
  public options: T;
  /**
   * A Consola logger who's tag will be the name of the generators class name
   */
  protected logger: Consola;
  /**
   * A Utility class that provides helpful methods for navigating the file system
   * with relation to the stubs / types directories generated by Kudra.
   */
  public resolver: Resolver;

  /**
   * The options provided in the apps nuxt.config.js/ts file
   */
  public nuxtOptions: NuxtOptions;
  /**
   * The options passed to the @kudra/nuxt module, after being merged with default kudra options.
   */
  public kudraOptions: KudraOptions;

  constructor(options: T, kudra: Kudra) {
    this.nuxt = kudra.nuxt;
    this.options = options;
    this.logger = kudra.createLogger(this.constructor.name);
    this.resolver = kudra.resolver;
    this.nuxtOptions = kudra.nuxtOptions;
    this.kudraOptions = kudra.kudraOptions;
  }
}

export interface Generator<T> extends GeneratorHooks {}

export interface GeneratorHooks {
  /**
   * Nuxt is ready to work (ModuleContainer and Renderer ready).
   * @see https://nuxtjs.org/docs/internals-glossary/internals-nuxt/#hooks
   */
  onReady?(nuxt: Nuxt): void;
  /**
   * An unhandled error when calling hooks.
   * @see https://nuxtjs.org/docs/internals-glossary/internals-nuxt/#hooks
   */
  onError?(error: Error): void;
  /**
   * Nuxt instance is gracefully closing.
   * @see https://nuxtjs.org/docs/internals-glossary/internals-nuxt/#hooks
   */
  onClose?(nuxt: Nuxt): void;
  /**
   * Nuxt internal server starts listening. (Using nuxt start or nuxt dev).
   * @see https://nuxtjs.org/docs/internals-glossary/internals-nuxt/#hooks
   */
  onListen?(server: Server, params: { host: string; port: number | string }): void;
  /**
   * Before setting up middleware and resources for the Renderer class, useful to overload some methods or options.
   * @see https://nuxtjs.org/docs/internals-glossary/internals-renderer/#hooks
   */
  onRenderBefore?(render: Server, options: any): void;
  /**
   * Before Nuxt adds its middleware stack. We can use it to register custom server side middleware.
   * @see https://nuxtjs.org/docs/internals-glossary/internals-renderer/#hooks
   */
  onRenderSetupMiddleware?(app: ConnectServer): void;
  /**
   * Before adding Nuxt error middleware, useful to add your own middleware before using Nuxt's. See the Sentry module for more info.
   * @see https://nuxtjs.org/docs/internals-glossary/internals-renderer/#hooks
   */
  onRenderErrorMiddleware?(app: ConnectServer): void;
  /**
   * Called after resources for renderer are loaded (client manifest, server bundle, etc).
   * @see https://nuxtjs.org/docs/internals-glossary/internals-renderer/#hooks
   */
  onRenderResourcesLoaded?(resources: any): void;
  /**
   * SSR Middleware and all resources are ready (Renderer ready)
   * @see https://nuxtjs.org/docs/internals-glossary/internals-renderer/#hooks
   */
  onRenderDone?(renderer: Server): void;
  /**
   * Every time a route is server-rendered. Called before sending back the request to the browser.
   * @see https://nuxtjs.org/docs/internals-glossary/internals-renderer/#hooks
   */
  onRenderRoute?(url: string, result: any, context: any): void;
  /**
   * Every time a route is server-rendered. Called after the response has been sent to the browser.
   * @see https://nuxtjs.org/docs/internals-glossary/internals-renderer/#hooks
   */
  onRenderRouteDone?(url: string, result: any, context: any): void;
  /**
   * Called before creating ModuleContainer class, useful to overload methods and options.
   * @see https://nuxtjs.org/docs/internals-glossary/internals-module-container/#hooks
   */
  onModulesBefore?(moduleContainer: ModuleContainer, options: any): void;
  /**
   * Called when all modules have been loaded.
   * @see https://nuxtjs.org/docs/internals-glossary/internals-module-container/#hooks
   */
  onModulesDone?(moduleContainer: ModuleContainer): void;
  /**
   * Before Nuxt build started
   * @see https://nuxtjs.org/docs/internals-glossary/internals-builder/#hooks
   */
  onBuildBefore?(builder: Builder, buildOptions: any): void;
  /**
   * The build directories have been created
   * @see https://nuxtjs.org/docs/internals-glossary/internals-builder/#hooks
   */
  onBuilderPrepared?(nuxt: Nuxt, options: any): void;
  /**
   * Generating plugins
   * @see https://nuxtjs.org/docs/internals-glossary/internals-builder/#hooks
   */
  onBuilderExtendPlugins?(plugins: NuxtOptions["plugins"]): void;
  /**
   * Generating .nuxt template files
   * @see https://nuxtjs.org/docs/internals-glossary/internals-builder/#hooks
   */
  onBuildTemplates?(params: { templateFiles: any; templateVars: any; resolve: any }): void;
  /**
   * Generating routes
   * @see https://nuxtjs.org/docs/internals-glossary/internals-builder/#hooks
   */
  onBuildExtendRoutes?(...args: Parameters<NonNullable<NuxtOptions["router"]["extendRoutes"]>>): void;
  /**
   * Before configuration of compilers
   * @see https://nuxtjs.org/docs/internals-glossary/internals-builder/#hooks
   */
  onWebpackConfig?(webpackConfigs: any): void;
  /**
   * Before webpack compile (compiler is a webpack Compiler instance), if universal mode, called twice with name 'client' and 'server'
   * @see https://nuxtjs.org/docs/internals-glossary/internals-builder/#hooks
   */
  onBuildCompile?(params: { name: "client" | "server"; compiler: any }): void;
  /**
   * webpack build finished
   * @see https://nuxtjs.org/docs/internals-glossary/internals-builder/#hooks
   */
  onBuildCompiled?(params: { name: "client" | "server"; compiler: any; stats: any }): void;
  /**
   * Nuxt build finished
   * @see https://nuxtjs.org/docs/internals-glossary/internals-builder/#hooks
   */
  onBuildDone?(builder: Builder): void;
  onComponentsExtend?(loadedComponents: Component[]): void;
}

export const hookCallNames: Record<keyof GeneratorHooks, string> = {
  onReady: "ready",
  onError: "error",
  onClose: "close",
  onListen: "listen",
  onRenderBefore: "render:before",
  onRenderSetupMiddleware: "render:setupMiddleware",
  onRenderErrorMiddleware: "render:errorMiddleware",
  onRenderResourcesLoaded: "render:resourcesLoaded",
  onRenderDone: "render:done",
  onRenderRoute: "render:route",
  onRenderRouteDone: "render:routeDone",
  onModulesBefore: "modules:before",
  onModulesDone: "modules:done",
  onBuildBefore: "build:before",
  onBuilderPrepared: "builder:prepared",
  onBuilderExtendPlugins: "builder:extendPlugins",
  onBuildTemplates: "build:templates",
  onBuildExtendRoutes: "build:extendRoutes",
  onWebpackConfig: "webpack:config",
  onBuildCompile: "build:compile",
  onBuildCompiled: "build:compiled",
  onBuildDone: "build:done",
  onComponentsExtend: "components:extend",
};

export interface Component {
  pascalName: string;
  kebabName: string;
  import: string;
  asyncImport: string;
  export: string;
  filePath: string;
  shortPath: string;
  isAsync?: boolean;
  chunkName: string;
  /** @deprecated */
  global: boolean;
  level: number;
  prefetch: boolean;
  preload: boolean;
}
