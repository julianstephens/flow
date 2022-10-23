import { Prisma } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import { DBContext } from "../db/db-context.js";
import { logger } from "../utils/logger.js";

const redis = DBContext.getInstance()?.cache;
if (!redis) {
  logger.error("DBErr: Could not get redis client.");
  throw Error();
}

export const cacheMiddleware: Prisma.Middleware = createPrismaRedisCache({
  models: [{ model: "User", cacheTime: 60000, excludeMethods: ["findMany"] }],
  storage: {
    type: "redis",
    options: { client: redis, invalidation: { referencesTTL: 300 }, log: console },
  },
  cacheTime: 300,
  excludeMethods: ["count", "groupBy"],
  onHit: (key) => {
    logger.log("hit", key);
  },
  onMiss: (key) => {
    logger.log("miss", key);
  },
  onError: (key) => {
    logger.log("error", key);
  },
});
