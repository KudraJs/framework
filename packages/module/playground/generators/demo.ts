import { defineGenerator, Generator, Kudra } from "../../src";

interface DemoGeneratorOptions {
  enable: boolean;
}

export class DemoGenerator extends Generator<DemoGeneratorOptions> {
  constructor(options: DemoGeneratorOptions, kudra: Kudra) {
    super(options, kudra);
    this.logger.info("Ran Demo Generator");
  }
}

export default defineGenerator<Partial<DemoGeneratorOptions>>((...args) => {
  const options = Object.assign({}, { enable: true }, args[0]);
  return new DemoGenerator(options, args[1]);
});
