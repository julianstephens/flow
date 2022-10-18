import { IEnvironment } from "@app/common/common.models";

export const environment: IEnvironment = {
  production: false,
  auth: {
    domain: "dev-8nx0w2kt.us.auth0.com",
    clientId: "U1uSdz2IkMborC9NM9sihV8DD21DQSV9",
    audience: "http://localhost:3000",
    redirectUri: "http://localhost:4200/auth/redirect",
  },
  apiUri: "http://localhost:3000/api",
};
