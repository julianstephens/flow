import { UserDto } from "@/dtos/user";
import { PrismaService } from "@/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async exists(opts: Prisma.UserWhereUniqueInput): Promise<boolean> {
    const userSelect = {
      id: true,
    } satisfies Prisma.UserSelect;

    const user = await this.find(opts, userSelect);
    return Boolean(user);
  }

  async find(
    opts: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect
  ): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: opts,
      ...(select ? { select } : {}),
    });
  }

  async create(data: UserDto): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async update(
    opts: Prisma.UserWhereUniqueInput,
    data: Partial<UserDto>
  ): Promise<User> {
    return await this.prisma.user.update({ where: opts, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
