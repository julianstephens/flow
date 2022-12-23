const { prettierConfig } = require('poetic');

module.exports = {
  ...prettierConfig,
  // Add custom rules here
  // printWidth: 100,
  singleQuote: false,
  trailingComma: 'all',
};
