import { getArgs } from "./args";
import { Builder } from "./builder";
import Canvas from "./canvas";
import { inquireConfig } from "./inquire";

export async function cli() {
  Canvas.Header();
  const args = await getArgs();
  const config = await inquireConfig(args);
  const builder = new Builder(config, args);
  await builder.build();
  Canvas.Footer({ ...config, ...args });
}
