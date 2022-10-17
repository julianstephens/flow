import fs from "fs/promises";


const clearEnv = async (isProd: boolean = false) => {
  const envFileContent = `
  import {IEnvironment} from "@app/models/common.models";

  export const environment: IEnvironment = {
    production: ${isProd},
    auth: {
      domain: "",
      clientId: "",
      audience: "",
      redirectUri: "",
    },
    apiUri: "",
  };
  `;

  const targetPath = `./src/environments/environment${isProd ? ".prod" : ""}.ts`;
  
  try {
    await fs.writeFile(targetPath, envFileContent);
    console.log(`ClearEnv: Removed ${isProd ? "PROD" : "DEV"} .env for git`);
  } catch (err) {
    console.log(`ClearEnv Error: ${err}`);
  }
};

// Clear dev 
clearEnv();

// Clear prod 
clearEnv(true);
