import { Prisma } from "@prisma/client";
import { Inject } from "@tsed/di";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import { REDIS_CONNECTION } from "src/config/redis";

export class CacheMiddleware {
  @Inject(REDIS_CONNECTION)
  protected redis: REDIS_CONNECTION;

  cacheMiddleware(): Prisma.Middleware {
    return createPrismaRedisCache({
      models: [{ model: "User", excludeMethods: ["findMany"] }],
      storage: {
        type: "memory",
        options: {
          invalidation: true,
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
  }
}
