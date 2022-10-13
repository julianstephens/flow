import { PrismaClient } from "@prisma/client";
import { logger } from "@utils/logger";
import { isNull } from "lodash";
import { Client } from "redis-om";

// Single shared DB Context instance
let instance: DBContext | null = null;

const { REDIS_URL } = process.env;

export class DBContext {
  client: PrismaClient;

  cache: Client;

  private constructor() {
    this.client = new PrismaClient({
      log: [
        {
          emit: "event",
          level: "query",
        },
      ],
    });
    this.cache = new Client();
  }

  async connect() {
    const [pg, redis] = await Promise.all([
      this.client.$connect(),
      this.cache.open(REDIS_URL),
    ]);
  }

  static async init() {
    if (!isNull(instance)) {
      return;
    }

    try {
      instance = new DBContext();
      logger.info("Attempting to connect to DB...");
      await instance.connect();
      logger.info("DB connected!");
    } catch (err) {
      logger.error("Error connecting to the DB");
      logger.error(err);
      throw err;
    }
  }
}
