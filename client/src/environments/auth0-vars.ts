
interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  apiURL: string;
}

export const AUTH_CONFIG: AuthConfig {
  clientID: "U1uSdz2IkMborC9NM9sihV8DD21DQSV9",
  domain: "dev-8nx0w2kt.us.auth0.com",
  callbackURL: env.auth.redirectUri,
  apiURL: env.apiURL
}
