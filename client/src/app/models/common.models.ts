export interface IEnvironment {
  production: boolean;
  auth: {
    domain?: string;
    clientId?: string;
    audience?: string;
    redirectUri?: string;
  };
  apiUri?: string;
}
