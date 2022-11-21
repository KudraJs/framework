declare module "@nuxt/builder" {
  import { Nuxt } from "@nuxt/core";
  import { NuxtOptions } from "@nuxt/types";
  import { Ignore as IgnoreType } from "ignore";

  export default class Builder {
    constructor(nuxt: Nuxt, bundleBuilder: any);
    nuxt: Nuxt;
    plugins: any[];
    options: NuxtOptions;
    globals: any;
    watchers: {
      files: any;
      custom: any;
      restart: any;
    };
    supportedExtensions: any[];
    relativeToBuild: (...args: any[]) => any;
    template: any;
    bundleBuilder: any;
    ignore: Ignore;
    getBundleBuilder(BundleBuilder: any): any;
    forGenerate(): void;
    build(): Builder;
    validatePages(): Promise<void>;
    globPathWithExtensions(path: any): string;
    createTemplateContext(): TemplateContext;
    generateRoutesAndFiles(): Promise<void>;
    normalizePlugins(): Promise<any>;
    addOptionalTemplates(templateContext: any): void;
    resolveFiles(dir: any, cwd?: any): Promise<any>;
    resolveRelative(dir: any): Promise<any>;
    resolveLayouts({ templateVars, templateFiles }: { templateVars: any; templateFiles: any }): Promise<void>;
    resolveRoutes({ templateVars }: { templateVars: any }): Promise<void>;
    routes: any;
    resolveStore({ templateVars, templateFiles }: { templateVars: any; templateFiles: any }): Promise<void>;
    resolveMiddleware({ templateVars, templateFiles }: { templateVars: any; templateFiles: any }): Promise<void>;
    resolveCustomTemplates(templateContext: any): Promise<void>;
    resolveLoadingIndicator({ templateFiles }: { templateFiles: any }): Promise<void>;
    compileTemplates(templateContext: any): Promise<void>;
    resolvePlugins(): Promise<void[]>;
    createFileWatcher(patterns: any, events: any, listener: any, watcherCreatedCallback: any): void;
    assignWatcher(key: any): (watcher: any) => void;
    watchClient(): void;
    serverMiddlewareHMR(): void;
    watchRestart(): void;
    unwatch(): void;
    close(): Promise<void>;
  }

  function getBuilder(nuxt: Nuxt): Builder;
  function build(nuxt: Nuxt): ReturnType<ReturnType<typeof getBuilder>["build"]>;

  interface TemplateContext {
    templateFiles: any[];
    templateVars: {
      nuxtOptions: any;
      features: any;
      extensions: any;
      messages: any;
      splitChunks: any;
      uniqBy: any;
      isDev: any;
      isTest: any;
      isFullStatic: any;
      debug: any;
      buildIndicator: any;
      vue: {
        config: any;
      };
      fetch: any;
      mode: any;
      router: any;
      env: any;
      head: any;
      store: any;
      globalName: any;
      globals: any;
      css: any;
      plugins: any;
      appPath: string;
      layouts: any;
      loading: any;
      pageTransition: any;
      layoutTransition: any;
      rootDir: any;
      srcDir: any;
      dir: any;
      components: {
        ErrorPage: any;
      };
    };
    get templateOptions(): {
      imports: {
        serialize: any;
        serializeFunction: any;
        devalue: any;
        hash: any;
        r: any;
        wp: any;
        wChunk: any;
        _: {};
      };
      interpolate: RegExp;
    };
  }

  interface Ignore {
    get IGNORE_FILENAME(): string;
    rootDir: NuxtOptions["rootDir"];
    ignoreOptions: any;
    ignoreArray: NuxtOptions["ignore"];
    findIgnoreFile(): any;
    ignoreFile: any;
    ignore: IgnoreType;
    readIgnoreFile(): any;
    addIgnoresRules(): void;
    filter(paths: any): any;
    reload(): void;
  }
}
