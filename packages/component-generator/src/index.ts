import { Component, defineGenerator, Generator, Kudra } from "@kudra/nuxt";

export interface ComponentGeneratorOptions {
  name: string;
}

export class ComponentGenerator extends Generator<ComponentGeneratorOptions> {
  constructor(options: ComponentGeneratorOptions, kudra: Kudra) {
    super(options, kudra);
    this.validateConfig();
  }

  /** Validates that the nuxt options has global components enabled */
  private validateConfig() {
    if (!this.nuxtOptions.components) {
      this.logger.warn(
        "You must set { components: true } in your nuxt config, to use the component loader."
      );
    }
  }

  /**
   * Called By Nuxt's Components Extend Hook.
   * @param loadedComponents - The components that have been loaded by Nuxt.
   */
  public onComponentsExtend(loadedComponents: Component[]): void {
    console.log("Detected Changes In Components", loadedComponents);
  }
}

export default defineGenerator<ComponentGeneratorOptions>((...args) => {
  return new ComponentGenerator(...args);
});
