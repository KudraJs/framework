import { relative, resolve } from "path";
import { Kudra } from "../kudra";

export class Resolver {
  private kudra: Kudra;

  constructor(kudra: Kudra) {
    this.kudra = kudra;
  }

  /**
   * The absolute path to the output directory specified in the
   * nuxt config -> kudra -> outputDir.
   *
   * @default <ProjectDirectory>/kudra
   */
  public get outDir(): string {
    return resolve(this.kudra.nuxtOptions.rootDir, this.kudra.kudraOptions.outputDir);
  }

  /**
   * Cleans the path separator found in a path. Useful to avoid
   * errors in .d.ts files where paths contain '\\' as their separator
   * @param path Path to sanitize
   */
  public sanitizePathSeparator(path: string): string {
    // Replace all backslashes with forward slashes
    return path.replace(/\\/g, this.kudra.kudraOptions.pathSeparator);
  }

  /**
   * Resolves an absolute path starting from the outputDir defined in the
   * nuxt config kudra options.
   */
  public resolveAbsolute(...args: string[]): string {
    const resolvedPath = resolve(this.outDir, ...args);
    return this.sanitizePathSeparator(resolvedPath);
  }

  /**
   * Resolves an relative path starting from the outputDir defined in the
   * nuxt config kudra options.
   */
  public resolveRelative(filePath: string): string {
    const relativePath = relative(this.outDir, filePath);
    return this.sanitizePathSeparator(relativePath);
  }

  /**
   * Resolves an absolute path to a .d.ts file in the output directory. The .d.ts file extension will be appended if it is not already present.
   * @param paths The path to the .d.ts file relative to the output directory. Ex: "types/index.d.ts" or "custom-types.d.ts" or "myDtsFile"
   */
  public resolveDTS(...paths: string[]): string {
    // Check if the file extension is already ending in .d.ts If not, add it.
    const lastArg = paths[paths.length - 1];
    if (!lastArg.endsWith(".d.ts")) {
      paths[paths.length - 1] = lastArg + ".d.ts";
    }

    return this.resolveAbsolute(this.outDir, ...paths);
  }
}
