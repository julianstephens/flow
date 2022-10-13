module.exports = {
  root: true,
  extends: ["./node_modules/poetic/config/eslint/eslint-config.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  // Add custom rules here
  rules: {
    // "no-loops/no-loops": 2,
    "class-methods-use-this": 1,
    "no-useless-constructor": 1,
    "no-empty-function": 1,
    "no-unused-vars": 1,
    "no-use-before-define": 1,
    "new-cap": 0,
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "import/prefer-default-export": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
