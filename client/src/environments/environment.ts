
  import {IEnvironment} from "@app/models/common.models";

  export const environment: IEnvironment = {
    production: false,
    auth: {
      domain: "",
      clientId: "",
      audience: "",
      redirectUri: "",
    },
    apiUri: "",
  };
  