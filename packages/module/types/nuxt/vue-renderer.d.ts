declare module "@nuxt/vue-renderer" {
  import { ServerContext } from "@nuxt/server";
  import fs from "fs";
  import { TemplateExecutor } from "lodash";
  import LRU from "lru-cache";
  import { BundleRenderer, Renderer } from "vue-server-renderer";

  interface BaseRenderer {
    serverContext: ServerContext;
    options: ServerContext["options"];
    vueRenderer: any;
    createRenderer(): void;
    renderTemplate(templateFn: any, opts: any): any;
    render(...args: any[]): void;
  }

  interface SSRRenderer extends BaseRenderer {
    get rendererOptions(): Record<string, any>;
    addAttrs(tags: any, referenceTag: any, referenceAttr: any): any;
    renderResourceHints(renderContext: any): any;
    renderScripts(renderContext: any): any;
    renderStyles(renderContext: any): any;
    getPreloadFiles(renderContext: any): any;
    createRenderer(): BundleRenderer;
    useSSRLog(): () => any[];
    render(renderContext: any): Promise<
      | {
          html: any;
          error: any;
          redirected: any;
          cspScriptSrcHashes?: undefined;
          preloadFiles?: undefined;
        }
      | {
          html: any;
          cspScriptSrcHashes: string[];
          preloadFiles: any;
          error: any;
          redirected: any;
        }
    >;
  }

  interface ModernRenderer extends SSRRenderer {
    publicPath: string;
    get assetsMapping(): Record<string, any>;
    get isServerMode(): boolean;
    getModernFiles(legacyFiles?: any[]): any[];
  }

  interface SPARenderer extends BaseRenderer {
    normalizeFile(file: any): {
      file: any;
      extension: string;
      fileWithoutQuery: any;
      asType: string;
    };
    getPreloadType(ext: string): "" | "script" | "style" | "font" | "image";
    cache: LRU<any, any>;
    vueMetaConfig: Record<string, any>;
    createRenderer(): Renderer;
    render(renderContext: any): Promise<any>;
  }

  class VueRenderer {
    constructor(context: ServerContext);
    serverContext: ServerContext;
    options: ServerContext["options"];
    renderer: {
      ssr: SSRRenderer;
      modern: ModernRenderer;
      spa: SPARenderer;
    };
    ready(): Promise<VueRenderer>;
    distPath: string;
    loadResources(_fs: typeof fs): Promise<void>;
    loadTemplates(): Promise<void>;
    get noSSR(): boolean;
    get SSR(): boolean;
    get isReady(): boolean;
    get isModernReady(): boolean | ServerContext["resources"]["modernManifest"];
    get isResourcesAvailable(): boolean;
    detectModernBuild(): void;
    createRenderer(): void;
    renderSPA(renderContext: any): VueRenderer["renderer"]["spa"];
    renderSSR(renderContext: any): VueRenderer["renderer"]["ssr"] | VueRenderer["renderer"]["modern"];
    // prettier-ignore
    renderRoute(url: any, renderContext?: {}, _retried?: number): boolean | VueRenderer["renderer"]["spa"] | VueRenderer["renderer"]["ssr"] | VueRenderer["renderer"]["modern"];

    get resourceMap(): {
      clientManifest: {
        fileName: string;
        transform: (src: any) => any;
      };
      modernManifest: {
        fileName: string;
        transform: (src: any) => any;
      };
      serverManifest: {
        fileName: string;
        transform: (
          src: any,
          {
            readResource,
          }: {
            readResource: any;
          }
        ) => Promise<any>;
      };
      ssrTemplate: {
        fileName: string;
        transform: (src: any) => any;
      };
      spaTemplate: {
        fileName: string;
        transform: (src: any) => any;
      };
    };
    parseTemplate(templateStr: any): TemplateExecutor;
    close(): void;
  }
}
