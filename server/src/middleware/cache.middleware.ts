import Redis from "ioredis";
import { createPrismaRedisCache } from "prisma-redis-middleware";

const { REDIS_HOST } = process.env;
const redis = new Redis({ host: REDIS_HOST });

export const cacheMiddleware = createPrismaRedisCache({
  models: [{ model: "User", excludeMethods: ["findMany"] }],
  storage: {
    type: "redis",
    options: {
      client: redis,
      invalidation: { referencesTTL: 300 },
      log: console,
    },
  },
  cacheTime: 300,
  excludeMethods: ["count", "groupBy"],
  onHit: (key) => {
    console.log("hit", key);
  },
  onMiss: (key) => {
    console.log("miss", key);
  },
  onError: (key) => {
    console.log("error", key);
  },
});
