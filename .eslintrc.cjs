module.exports = {
  extends: ["alloy", "alloy/react", "alloy/typescript", "next"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    // Customize your rules
  },
  ignorePatterns: [
    "env.js",
    ".eslintrc.cjs",
    "tailwind.config.ts",
    "drizzle.config.ts",
  ],
};
