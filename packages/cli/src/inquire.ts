import inquirer from "inquirer";
import { basename, resolve } from "path";
import { KudraArgs } from "./args";

export const PackageManagers = ["Yarn", "Npm"] as const;
export const UiFrameworks = ["none", "vuetify"] as const;
export const NuxtModules = ["axios"] as const;

export interface KudraConfig {
  name: string;
  packageManager: typeof PackageManagers[number];
  ui: typeof UiFrameworks[number];
  typedVuex: boolean;
}

export async function inquireConfig(kudraArgs: KudraArgs): Promise<KudraConfig> {
  const config = await inquirer.prompt<KudraConfig>([
    {
      type: "input",
      name: "name",
      message: "Project Name",
      default: () => {
        return basename(resolve(process.cwd(), kudraArgs.outputDir));
      },
    },
    {
      type: "list",
      name: "packageManager",
      message: "Package Manager",
      choices: PackageManagers,
      default: PackageManagers[0],
    },
    {
      type: "list",
      name: "ui",
      message: "Ui Framework (Typed)",
      choices: [
        {
          name: "Vuetify",

          value: UiFrameworks[1],
        },
        {
          name: "None",
          value: UiFrameworks[0],
        },
      ],
      default: UiFrameworks[0],
    },
  ]);

  return config;
}
