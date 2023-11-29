import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import path from "path";
import postgres from "postgres";
import prexit from "prexit";
import { env } from "~/env";

const migrationClient = postgres(env.DATABASE_URL, { max: 1 });

try {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: path.join(env.ROOT_DIR, "drizzle", "migrations"),
  });
  process.exitCode = 0;
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}

prexit(async () => {
  await migrationClient.end({ timeout: 5 });
});
