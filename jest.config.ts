/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfigJson from "./tsconfig.json";

const jestConfig: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  coveragePathIgnorePatterns: ["/__tests__/.*", "/node_modules/.*"],

  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: true,

  // The default configuration for fake timers
  // fakeTimers: {
  //   "enableGlobally": false
  // },

  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: undefined,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: undefined,

  // A set of global variables that need to be available in all test environments
  // globals: {},

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ["node_modules"],

  // An array of file extensions your modules use
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfigJson.compilerOptions.paths, { prefix: '<rootDir>/' }),
    /* cSpell:disable-next-line */
    ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/__tests__/utils/config/style-mock.js",
    /* cSpell:disable-next-line */
    // ".+\\.(png|jpg|svg)$": "<rootDir>/__tests__/utils/config/file-mock.js",
  },
  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",

  // A preset that is used as a base for Jest's configuration
  // preset: undefined,

  // Run tests from one or more projects
  // projects: undefined,

  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,

  // Automatically reset mock state before every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  resolver: "ts-jest-resolver",

  // Automatically restore mock state and implementation before every test
  // restoreMocks: false,

  // The root directory that Jest should scan for tests and modules within
  // rootDir: undefined,

  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
  rootDir: process.cwd(),

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ["./__tests__/utils/set-up-env-jest.ts", "./__tests__/utils/set-up-window.ts"],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  // slowTestThreshold: 5,

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  // The glob patterns Jest uses to detect test files
  testMatch: ["<rootDir>/__tests__/**/*.[jt]s?(x)"],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ["/__tests__/utils/.*", "/node_modules/"],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: "**\\/__tests__\\/**\\/*\\.test\\.ts",

  // This option allows the use of a custom results processor
  // testResultsProcessor: undefined,

  // This option allows use of a custom test runner
  // testRunner: "jest-circus/runner",

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.tsx?$": ["@swc/jest", {
      jsc: {
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
    }],
    /* cSpell:disable-next-line */
    ".+\\.(png|jpg|ttf|woff|woff2|svg)$":
      "<rootDir>/__tests__/utils/config/asset-transformer.js",
  },
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ["/node_modules/"],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them

  /* cSpell:disable-next-line */
  // unmockedModulePathPatterns: undefined,

  // Indicates whether each individual test should be reported during the run
  verbose: false,
  silent: false,
  extensionsToTreatAsEsm: [".ts", ".tsx"]

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],

  // Whether to use watchman for file crawling
  // watchman: true,
};
export default jestConfig;
