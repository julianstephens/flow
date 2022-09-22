import { PrismaClient } from "@prisma/client";
import { logger } from "@utils/logger";
import { isNull } from "lodash";

let instance: DBContext = null;

export default class DBContext {
  client: PrismaClient;

  private constructor() {
    this.client = new PrismaClient({
      log: [
        {
          emit: "event",
          level: "query",
        }
      ]
    })
  }

  async connect() {
    await this.client.$connect()
  }

  static async init() {
    if (!isNull(instance)) {
      return;
    }

    try {
      instance = new DBContext();
      logger.info("Attempting to connect to DB...");
      await instance.connect();
      logger.info("DB connected!")
    } catch(err) {
      logger.error("Error connecting to the DB")
      logger.error(err)
      throw err
    }
  }
}

