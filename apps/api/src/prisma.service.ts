import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { prisma, PrismaClient } from "db";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  readonly db: PrismaClient = prisma;

  async onModuleInit() {
    await this.db.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.db.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
