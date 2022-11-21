declare module "@nuxt/core" {
  import { Server } from "@nuxt/server";
  import { NuxtConfig, NuxtOptions } from "@nuxt/types";
  import { NuxtOptionsLoaders } from "@nuxt/types/config/build";
  import { NuxtOptionsServerMiddleware } from "@nuxt/types/config/server-middleware";
  import Hable from "hable";
  import { LiteralUnion } from "type-fest";
  import { Configuration as WebpackConfiguration } from "webpack";

  export class Nuxt {
    resolver: Resolver;
    server: Server;
    moduleContainer: Module;
    renderer: Server;
    options: NuxtOptions;
    render: Server["app"];
    constructor(options?: NuxtConfig);
    static get version(): string;
    ready(): Promise<Nuxt>;
    close(callback: Function): Promise<void>;
    showReady: () => void;
  }
  export interface Nuxt extends Hable {}

  export const loadNuxtConfig: any;

  /**
   * Load Nuxt.js instance
   * @see https://nuxtjs.org/docs/internals-glossary/nuxt#nuxt-constructor
   * @param loadOptions
   */
  export function loadNuxt(
    loadOptions: LiteralUnion<
      keyof {
        dry: { dev: false; server: false };
        dev: { dev: true; _build: true };
        build: { dev: false; server: false; _build: true };
        start: { dev: false; _start: true };
      },
      string
    >
  ): Promise<Nuxt>;

  export class Resolver {
    constructor(nuxt: Nuxt);
    nuxt: Nuxt;
    options: Nuxt["options"];
    resolvePath(
      path$1: any,
      {
        alias,
        isAlias,
        module,
        isModule,
        isStyle,
        paths,
      }?: {
        alias: any;
        isAlias?: any;
        module: any;
        isModule?: any;
        isStyle: any;
        paths: any;
      }
    ): any;
    resolveAlias(path$1: any): string;
    resolveModule(
      path: any,
      {
        paths,
      }?: {
        paths: any;
      }
    ): any;
    requireModule(
      path: any,
      {
        alias,
        isAlias,
        intropDefault,
        interopDefault,
        paths,
      }?: {
        alias: any;
        isAlias?: any;
        intropDefault: any;
        interopDefault?: any;
        paths: any;
      }
    ): any;
  }

  /** Nuxt Module Container */
  export interface ModuleTemplateObj {
    src: string;
    options: any;
    fileName?: string;
  }

  export type ModuleTemplate = string | ModuleTemplateObj;

  export interface PluginTemplate extends ModuleTemplateObj {
    mode?: "client" | "server";
  }

  export interface NuxtRequiredModule {
    [key: string]: {
      src: string;
      options: any;
      handler: any;
    };
  }

  export interface ExtendFunctionContext {
    isClient: boolean;
    isDev: boolean;
    isLegacy: boolean;
    isModern: boolean;
    isServer: boolean;
    loaders: NuxtOptionsLoaders;
  }

  export type ExtendFunction = (config: WebpackConfiguration, ctx: ExtendFunctionContext) => void;

  export interface BuildTemplate {
    /** Can be absolute or relative path to the template */
    src: string;
    /** Destination dir  relative to project `.nuxt` dir */
    dst: string;
    /** Options that will be provided to the template as `options` key */
    options: Record<string, any>;
  }

  export class Module {
    constructor(nuxt: Nuxt);
    nuxt: Nuxt;
    options: Nuxt["options"];
    requiredModules: NuxtRequiredModule;
    /**
     * Called when all modules in nuxt.config has been initialized
     */
    ready(): Promise<void>;
    /**
     * @deprecated Deprecated as vendor isn't used anymore
     * @see https://nuxtjs.org/docs/internals-glossary/internals-module-container/#addvendor-vendor
     */
    addVendor(): void;
    /**
     * Renders given template using lodash template during build into project buildDir (.nuxt).
     * If fileName is not provided or template is string, target file name defaults to [dirName].[fileName].[pathHash].[ext].
     * This method returns final { dst, src, options } object.
     * @see https://nuxtjs.org/docs/internals-glossary/internals-module-container/#addtemplate-template
     */
    addTemplate(template: ModuleTemplate): BuildTemplate;
    /**
     * Registers a plugin using addTemplate and prepends it it to plugins[] array.
     * Note: You can use mode or .client and .server modifiers with fileName option to use plugin only in client or server
     * side. (See plugins for all available options)
     *
     * If you choose to specify a fileName, you can configure a custom path for the fileName too, so you can choose the folder
     * structure inside .nuxt folder in order to prevent name collisioning:
     * @param template  Object properties (src, options, fileName, mode).
     *
     * @see https://nuxtjs.org/docs/internals-glossary/internals-module-container/#addtemplate-template
     */
    addPlugin(template: PluginTemplate): void;
    /**
     * Registers a layout using addTemplate and adds it to options.layouts[].
     * If name == 'error', it will be sent to addErrorLayout(dst)
     * @param template
     * @param name
     */
    addLayout(template: ModuleTemplate, name: string): void;
    /**
     * Registers an error layout
     * @param dst The layouts dst path
     */
    addErrorLayout(dst: string): void;
    /**
     * Pushes middleware into options.serverMiddleware .
     * @param middleware
     * @see https://nuxtjs.org/docs/internals-glossary/internals-module-container/#addservermiddleware-middleware
     */
    addServerMiddleware(middleware: NuxtOptionsServerMiddleware): void;
    /**
     * Allows easily extending webpack build config by chaining options.build.extend function.
     * @param fn TODO
     * @see https://nuxtjs.org/docs/internals-glossary/internals-module-container/#extendbuild-fn
     */
    extendBuild(fn: NuxtOptions["build"]["extend"]): void;
    /**
     * Allows easily extending routes by chaining options.build.extendRoutes function.
     * @see https://nuxtjs.org/docs/internals-glossary/internals-module-container/#extendbuild-fn
     * @param fn
     */
    extendRoutes(fn: NuxtOptions["router"]["extendRoutes"]): void;
    /**
     * Is a shortcut for addModule(moduleOpts, true)
     * @see https://nuxtjs.org/docs/internals-glossary/internals-module-container/#requiremodule-moduleopts
     * @param moduleOpts
     * @param param1
     */
    requireModule(
      moduleOpts: any,
      {
        paths,
      }?: {
        paths: any;
      }
    ): Promise<any>;
    /**
     * Registers a module. moduleOpts can be a string or an array ([src, options]).
     * If requireOnce is true and the resolved module exports meta, it prevents registering same module twice.
     * @see https://nuxtjs.org/docs/internals-glossary/internals-module-container/#addmodule-moduleopts-requireonce
     * @param moduleOpts
     * @param arg2
     * @param arg3
     */
    addModule(moduleOpts: any, arg2: any, arg3: any): Promise<any>;
  }
}
