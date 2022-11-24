import { BuildTemplatesParams, Generator, Kudra, Layouts, Middleware } from "@kudra/nuxt";
import { ModuleDeclarationKind, OptionalKind, PropertySignatureStructure, StatementStructures, StructureKind } from "ts-morph";
import { defineMiddleware } from "./functions/defineMiddleware";
import { UtilitiesGeneratorOptions } from "./options";

const META_PATH = "@kudra/utilities-generator";

export class UtilitiesGenerator extends Generator<UtilitiesGeneratorOptions> {
  constructor(options: UtilitiesGeneratorOptions, kudra: Kudra) {
    super(options, kudra);
    this.logger.info("Utilities Generator Initialized !");

    this.typeWriter.addGlobalDeclaration(
      {
        name: "definePage",
        type: `typeof import('${META_PATH}')['definePage']`,
      },
      (options: any) => options
    );
    this.typeWriter.addGlobalDeclaration(
      {
        name: "defineMiddleware",
        type: `typeof import('${META_PATH}')['defineMiddleware']`,
      },
      defineMiddleware
    );
    this.typeWriter.addGlobalDeclaration(
      {
        name: "defineLayout",
        type: `typeof import('${META_PATH}')['defineLayout']`,
      },
      (options: any) => options
    );
    this.typeWriter.addGlobalDeclaration(
      {
        name: "defineComponent",
        type: `typeof import('${META_PATH}')['defineComponent']`,
      },
      (options: any) => options
    );
  }

  private get isStrict(): "true" | "false" {
    return this.options.strict ? "true" : "false";
  }

  private constructUnionStr(items: string[]) {
    return items.map((item) => `'${item}'`).join(" | ");
  }

  private generateUtilityTypes(middleware: Middleware[], layouts: Layouts) {
    const dtsFile = this.typeWriter.createSourceFile(this.options.filename);

    const definePageStatement = this.definePageStatement(middleware, layouts);
    const defineLayoutStatement = this.defineLayoutStatement(middleware);

    dtsFile.addStatements([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: META_PATH,
        namedImports: ["Middleware", "Layout"],
      },
      {
        kind: StructureKind.Module,
        name: `"${META_PATH}"`,
        declarationKind: ModuleDeclarationKind.Module,
        hasDeclareKeyword: true,
        statements: [definePageStatement, defineLayoutStatement],
      },
      {
        kind: StructureKind.ExportDeclaration,
      },
    ]);

    dtsFile.saveSync();
  }

  private definePageStatement(middleware: Middleware[], layouts: Layouts): StatementStructures {
    const middlewareProps = this.generateMiddlewareProperties(middleware);
    const layoutProps = this.generateLayoutProperties(layouts);

    const DefinePageOptions: StatementStructures = {
      kind: StructureKind.Interface,
      name: "DefinePageOptions",
      isExported: true,
      typeParameters: ["RawBindings"],
      properties: [middlewareProps, layoutProps],
    };
    return DefinePageOptions;
  }

  private defineLayoutStatement(middleware: Middleware[]): StatementStructures {
    const middlewareProps = this.generateMiddlewareProperties(middleware);

    const DefinePageOptions: StatementStructures = {
      kind: StructureKind.Interface,
      name: "DefineLayoutOptions",
      isExported: true,
      properties: [middlewareProps],
    };
    return DefinePageOptions;
  }

  private generateMiddlewareProperties(middleware: Middleware[]): OptionalKind<PropertySignatureStructure> {
    const middlewareNames = this.constructUnionStr(middleware.map((middleware) => middleware.name));
    const middlewareStr = middleware.length > 0 ? `<${middlewareNames}, ${this.isStrict}>` : `<never, ${this.isStrict}>`;

    const middlewareProps: OptionalKind<PropertySignatureStructure> = {
      name: "middleware",
      hasQuestionToken: true,
      type: `Middleware${middlewareStr}`,
    };

    return middlewareProps;
  }

  private generateLayoutProperties(layouts: Layouts): OptionalKind<PropertySignatureStructure> {
    const layoutList = Object.keys(layouts);
    const layoutNames = this.constructUnionStr(layoutList);
    const layoutStr = layoutList.length > 0 ? `<${layoutNames}, ${this.isStrict}>` : `<null, ${this.isStrict}>`;

    const layoutProps: OptionalKind<PropertySignatureStructure> = {
      name: "layout",
      hasQuestionToken: true,
      type: `Layout${layoutStr}`,
    };

    return layoutProps;
  }

  onBuildTemplates({ templateVars }: BuildTemplatesParams): void {
    this.generateUtilityTypes(templateVars.middleware, templateVars.layouts);
  }
}
