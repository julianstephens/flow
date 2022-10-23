import { Prisma, PrismaClient, User } from "@prisma/client";
import { DBContext } from "../db-context.js";

export default class UserRepository {
  db: PrismaClient;

  constructor() {
    this.db = DBContext.getInstance()!.client;
  }

  async get(id: number): Promise<User | null> {
    return this.db.user.findUnique({ where: { id } });
  }

  async create(req: Prisma.UserCreateInput): Promise<User> {
    return this.db.user.create({ data: req });
  }
}
