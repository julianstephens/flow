import { IEnvironment } from "@app/common/common.models";

export const environment: IEnvironment = {
  production: true,
  auth: {
    domain: "",
    clientId: "",
    audience: "",
    redirectUri: "",
  },
  apiUri: "",
};
