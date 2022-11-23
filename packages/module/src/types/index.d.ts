import { PartialDeep } from "type-fest";
import { KudraOptions } from "../kudra/options";

declare module "@nuxt/types" {
  interface Configuration {
    kudra?: PartialDeep<KudraOptions>;
  }
}
export {};
