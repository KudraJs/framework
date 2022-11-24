import { NuxtMiddlewareFN } from "../runtime";

/**
 * Defines A Nuxt Middleware
 *
 * The callback parameter (cb) is now deprecated. Please switch to promises or async/await syntax
 *
 */
export const defineMiddleware = (middleware: NuxtMiddlewareFN): NuxtMiddlewareFN => middleware;
