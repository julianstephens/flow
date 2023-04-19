import { z } from "nestjs-zod/z";

const e = z.object({
  APP_NAME: z.string(),
  API_NAME: z.string(),
  API_VERSION: z.string().default("1"),
  PLAID_CLIENT: z.string(),
  PLAID_SECRET: z.string(),
  NODE_ENV: z.enum(["development", "test", "production", "staging"]),
});
const env = e.parse(process.env);

export default env;
