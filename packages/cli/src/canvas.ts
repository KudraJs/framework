import chalk from "chalk";
import figlet from "figlet";
import path from "path";
import { KudraArgs } from "./args";
import { KudraConfig } from "./inquire";

export default class Canvas {
  public static Header() {
    const header = figlet.textSync("Kudra", {});
    console.log(chalk`{bold.cyan ${header}}`);
  }

  public static Footer({ name, outputDir, packageManager }: KudraConfig & KudraArgs) {
    const isNewFolder = path.resolve(outputDir) !== process.cwd();

    const cdMsg = isNewFolder ? `cd ${name}` : "";

    const pmRun = packageManager === "Yarn" ? "yarn" : "npm run";

    console.log(chalk`\n🎉  {bold Successfully created project} {cyan ${name}}\n`);

    console.log(chalk`  {bold To get started:}\n`);
    console.log(chalk`${cdMsg}\t{cyan ${pmRun} dev}\n`);

    console.log(chalk`  {bold To build & start for production:}\n`);
    console.log(chalk`${cdMsg}\t{cyan ${pmRun} build}`);
    console.log(chalk`\t{cyan ${pmRun} start}\n`);
  }
}
