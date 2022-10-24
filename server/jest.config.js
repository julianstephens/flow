// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ["index.ts", "/dist/", "/node_modules/"],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/src/**/__tests__/**/*.ts?(x)", "**/src/**/?(*.)+(spec|test).ts?(x)"],
  // A map from regular expressions to paths to transformers
  transform: {
    "\\.(ts)$": "ts-jest",
  },

  // Map TS path aliases
  moduleNameMapper: {
    "^@generated/(.*)$": "<rootDir>/prisma/generated/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@middleware/(.*)$": "<rootDir>/src/middleware/$1",
    "^@interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@errors/(.*)$": "<rootDir>/src/errors/$1",
  },
};
