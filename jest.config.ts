import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  verbose: true,
  projects: [
    {
      preset: "ts-jest",
      testEnvironment: "node",
      testMatch: ["<rootDir>/packages/**/*.test.ts"],
    },
  ],
  coverageDirectory: "./coverage",
  collectCoverageFrom: ["packages/**/src/**/*.ts"],
  collectCoverage: true,
};

export default jestConfig;
