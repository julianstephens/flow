module.exports = {
  roots: ["<rootDir>"],
  testRegex: ".*\\.spec.ts$",
  transform: {
    "^.+\\.(t|j)s": "ts-jest",
    "^.+\\.(t|j)sx": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePathIgnorePatterns: [
    "<rootDir>/test/__fixtures__",
    "<rootDir>/node_modules",
    "<rootDir>/dist",
  ],
  collectCoverageFrom: ["**/*.(t|j)s", "**/*.(t|j)sx"],
  coverageDirectory: "<rootDir>/coverage",
  preset: "ts-jest",
  testEnvironment: "node",
};
