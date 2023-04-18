import { Environment } from "@/shared/types";

declare const NODE_ENV: string;
declare const AUTH_DOMAIN: string;
declare const AUTH_CLIENT: string;
declare const API_URL: string;

export const environment: Environment = {
  isProd: NODE_ENV === "production",
  auth: {
    domain: AUTH_DOMAIN,
    clientId: AUTH_CLIENT,
  },
  apiUri: API_URL,
};
