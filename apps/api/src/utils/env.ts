import { z } from "nestjs-zod/z";

const env = z.object({
  APP_NAME: z.string(),
  API_NAME: z.string(),
  API_VERSION: z.string().default("1"),
  PLAID_CLIENT: z.string(),
  PLAID_SECRET: z.string(),
  AUTH0_DOMAIN: z.string(),
  AUTH0_PM_CLIENT_ID: z.string(),
  AUTH0_PM_CLIENT_SECRET: z.string(),
  AUTH0_CLIENT_ID: z.string(),
  AUTH0_AUDIENCE: z.string(),
  NODE_ENV: z.enum(["development", "test", "production", "staging"]),
});

export default env;
