import { writeFile } from "fs";
import yargs from "yargs";

const parser = yargs(process.argv.slice(2)).options({
  environment: { type: "string", default: "development" },
});

const argv = await parser.argv;
const { environment = "dev" } = argv;

const isProd = environment === "production";
console.log(`Populating environment variables for ${isProd ? "PROD" : "DEV"}`);

const targetPath = isProd
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;

const envFileContent = `
import {IEnvironment} from "@shared/interfaces/index";

export const environment: IEnvironment = {
  production: ${isProd},
  auth: {
    domain: "${process.env["AUTH0_DOMAIN"]}",
    clientId: "${process.env["AUTH0_CLIENT_ID"]}",
    audience: "${process.env["AUTH0_AUDIENCE"]}",
    redirectUri: "${process.env["AUTH0_REDIRECT"]}",
  },
  apiUri: "${process.env["API_URI"]}",
};
`;

writeFile(targetPath, envFileContent, (err) => {
  console.log(`SetEnv: Wrote variables to ${targetPath}`);

  if (err) console.log(`SetEnv Error: ${err}`);
});
