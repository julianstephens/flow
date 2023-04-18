import { CreateUserDto, UpdateUserDto } from "@/dtos/user";
import { PrismaService } from "@/prisma.service";
import { FindOneQuery } from "@/types";
import { Injectable } from "@nestjs/common";
import { Prisma, User } from "db";

@Injectable()
export class UserService {
  constructor(private prismaSVC: PrismaService) {}

  async find(
    query: FindOneQuery,
    select?: Prisma.UserSelect
  ): Promise<User | null> {
    return await this.prismaSVC.db.user.findUnique({
      where: query,
      ...(select ? { select } : {}),
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    return await this.prismaSVC.db.user.create({ data });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return await this.prismaSVC.db.user.update({ where: { id }, data });
  }

  async delete(id: number): Promise<User> {
    return await this.prismaSVC.db.user.delete({ where: { id } });
  }
}
