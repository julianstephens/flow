import { Prisma, User } from "@prisma/client";
import UserRepository from "../db/repositories/user.repo.js";

export default class UserService {
  constructor(private userRepo: UserRepository) {}

  async getUserById(id: number): Promise<User | null> {
    return this.userRepo.get(id);
  }

  async createUser(req: Prisma.UserCreateInput): Promise<User> {
    return this.userRepo.create(req);
  }
}
