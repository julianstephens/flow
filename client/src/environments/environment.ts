
  import {IEnvironment} from "@app/common/common.models";

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
  