import { defineGenerator, Generator, Kudra } from "../../src";

interface Options {
  name: string;
}

const defaultOptions: Options = {
  name: "person",
};

class DemoGenerator extends Generator<Options> {
  constructor(kudra: Kudra, options: Options) {
    super(kudra, options);
    this.logger.info("Hello World", options);
  }

  async generate() {
    this.logger.info("Hello World");
  }
}

export default defineGenerator<Options>((kudra, options) => {
  const opts = { ...defaultOptions, ...options };
  return new DemoGenerator(kudra, opts);
});
