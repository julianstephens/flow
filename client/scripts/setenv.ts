import dotenv from "dotenv";
import { writeFile } from "fs";
import yargs from "yargs";

dotenv.config({ path: "./.env"});

const parser = yargs(process.argv.slice(2))
  .options({ environment: { type: "string", default: "development" } })


(async() => {
  const argv = await parser.argv;
  const environment = argv.environment;

  const isProd = environment === "production";
  console.log(`Populating environment variables for ${isProd ? "DEV" : "PROD"}`);

  const targetPath = isProd
    ? `./src/environments/environment.prod.ts`
    : `./src/environments/environment.ts`;

  const envFileContent = `
  import {IEnvironment} from "@app/models/common.models";

  export const environment: IEnvironment = {
    production: ${isProd},
    auth: {
      domain: "${process.env["AUTH0_DOMAIN"]}",
      clientId: "${process.env["AUTH0_CLIENT"]}",
      audience: "${process.env["AUTH0_AUDIENCE"]}",
      redirectUri: "${process.env["AUTH0_REDIRECT"]}",
    },
    apiUri: "${process.env["API_URI"]}",
  };
  `;

  writeFile(targetPath, envFileContent, err => {
    console.log(`SetEnv: Wrote variables to ${targetPath}`);

    if (err) console.log(`SetEnv Error: ${err}`);
  });
})();
