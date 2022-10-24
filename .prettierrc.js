const { prettierConfig } = require("poetic");

module.exports = {
    ...prettierConfig,
    // Add custom rules here
    // printWidth: 100,
    trailingComma: "all",
    singleQuote: false,
    semi: true,
};