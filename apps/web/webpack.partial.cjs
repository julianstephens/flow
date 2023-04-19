const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env["API_URL"]),
      AUTH_DOMAIN: JSON.stringify(process.env["AUTH0_DOMAIN"]),
      AUTH_CLIENT: JSON.stringify(process.env["AUTH0_CLIENT"]),
      NODE_ENV: JSON.stringify(process.env["NODE_ENV"]),
    }),
  ],
};
