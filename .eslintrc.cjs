module.exports = {
    extends: [
        "alloy",
        "alloy/react",
        "alloy/typescript",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "next",
    ],
    plugins: ["react"],
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: "./tsconfig.json",
        ecmaFeatures: {
            jsx: true,
        },
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
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    ignorePatterns: [
        "next.config.js",
        "env.js",
        ".eslintrc.cjs",
        "tailwind.config.ts",
        "drizzle.config.ts",
    ],
};
