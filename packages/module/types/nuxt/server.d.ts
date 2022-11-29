declare module "@nuxt/server" {
  import { Nuxt } from "@nuxt/core";
  import { NuxtOptions } from "@nuxt/types";
  import { VueRenderer } from "@nuxt/vue-renderer";
  import connect from "connect";

  class Server {
    constructor(nuxt: Nuxt);
    nuxt: Nuxt;
    options: NuxtOptions;
    globals: Record<string, any>;
    publicPath: string;
    resources: Record<string, any>;
    listeners: any[];
    app: connect.Server;
    devMiddleware: NuxtOptions["build"]["devMiddleware"];
    serverContext: ServerContext;
    renderer: VueRenderer;
    ready(): Promise<Server>;
    setupMiddleware(): Promise<void>;
    resolveMiddleware(middleware: any, fallbackRoute?: string): any;
    useMiddleware(middleware: any): void;
    replaceMiddleware(query: any, middleware: any): any;
    unloadMiddleware({ handle }: { handle: any }): void;
    serverMiddlewarePaths(): any;
    renderRoute(...args: any[]): any;
    loadResources(...args: any[]): any;
    renderAndGetWindow(
      url: any,
      opts?: {},
      {
        loadingTimeout,
        loadedCallback,
        globals,
      }?: {
        loadingTimeout?: number;
        loadedCallback?: any;
        globals?: any;
      }
    ): Promise<any>;
    listen(
      port?: NuxtOptions["server"]["port"],
      host?: NuxtOptions["server"]["host"],
      socket?: NuxtOptions["server"]["socket"]
    ): Promise<Listener>;
    close(): Promise<void>;
  }

  interface ServerContext {
    nuxt: Nuxt;
    globals: Server["globals"];
    options: Server["options"];
    resources: Server["resources"];
  }

  class Listener {
    constructor({
      port,
      host,
      socket,
      https,
      app,
      dev,
      baseURL,
    }: {
      port: NuxtOptions["server"]["port"];
      host: NuxtOptions["server"]["host"];
      socket: NuxtOptions["server"]["socket"];
      https: NuxtOptions["server"]["https"];
      app: connect.Server;
      dev: NuxtOptions["dev"];
      baseURL: NuxtOptions["router"]["base"];
    });
    port: NuxtOptions["server"]["port"];
    host: NuxtOptions["server"]["host"];
    socket: NuxtOptions["server"]["socket"];
    https: NuxtOptions["server"]["https"];
    app: connect.Server;
    dev: NuxtOptions["dev"];
    baseURL: NuxtOptions["router"]["base"];
    listening: boolean;
    server: Server;
    address: any;
    url: string;
    close(): Promise<void>;
    computeURL(): void;
    listen(): Promise<void>;
    serverErrorHandler(error: any): Promise<void>;
  }
}
