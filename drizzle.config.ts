import type { Config } from "drizzle-kit";
import { env } from "~/env";

export default {
  schema: "./src/server/db/schemas/*",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
