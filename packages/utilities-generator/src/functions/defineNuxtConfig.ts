import { NuxtConfig } from "@nuxt/types";

export const defineNuxtConfig = <T extends NuxtConfig>(config: T): T => config;
