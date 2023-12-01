/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  trailingComma: "all",
  semi: true,
  singleQuote: false,
  tabWidth: 4,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
