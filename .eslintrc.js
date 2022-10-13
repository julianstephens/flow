module.exports = {
  extends: ["./node_modules/poetic/config/eslint/eslint-config.js"],
  plugins: ["no-loops"],
  // Add custom rules here
  rules: {
    "no-loops/no-loops": 2,
    "no-unused-vars": 1,
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};
