import { UserNotFound } from "@errors/index";
import { UserModel, UsersRepository } from "@generated/tsed";
import { IDFormatException } from "@interfaces/common.interfaces";
import { IUserInput, IUserSearchFilters, UserSelectProfile } from "@interfaces/user.interfaces";
import { Prisma } from "@prisma/client";
import { Inject, Injectable } from "@tsed/di";

@Injectable()
export class UserService {
  @Inject()
  protected repo: UsersRepository;

  /**
   * Create a user
   * @param input <IUserInput>
   * @returns <UserModel> - the created user filtered by profile fields
   */
  async createUser(input: IUserInput): Promise<UserModel> {
    const args = Prisma.validator<Prisma.UserCreateArgs>()({ data: { ...input } });

    const user = await this.repo.create(args);
    if (!user) throw new UserNotFound();

    return user;
  }

  /**
   * Search users with filters
   * @param filters <IUserSearchFilters> - IUserSearchFilters
   * @returns <UserModel[]> - list of users filtered by profile fields
   */
  async searchUsers(filters: IUserSearchFilters): Promise<UserModel[]> {
    const args: Prisma.UserFindManyArgs = {};

    if (filters.limit) {
      args.take = filters.limit;
    }
    if (filters.email) {
      args.where = { ...args.where, email: filters.email };
    }
    if (filters.fullName) {
      args.where = { ...args.where, fullName: filters.fullName };
    }
    if (filters.shortName) {
      args.where = { ...args.where, shortName: filters.shortName };
    }
    if (filters.orderBy) {
      args.orderBy = {};
      args.orderBy[filters.orderBy.prop as keyof Prisma.UserOrderByWithRelationInput] =
        filters.orderBy.direction;
    }

    Prisma.validator<Prisma.UserFindManyArgs>()({ select: UserSelectProfile });
    const users = this.repo.findMany(args);

    if (!users) throw new UserNotFound();

    return users;
  }

  /**
   * Retrieve a single user by ID
   * @param id <number>
   * @returns <UserModel> - the user filtered by profile fields
   */
  async getUser(id: number): Promise<UserModel> {
    if (Number.isNaN(id)) {
      throw new IDFormatException();
    }

    const args: Prisma.UserFindUniqueArgs = {
      where: {
        id,
      },
      select: UserSelectProfile,
    };

    const user = await this.repo.findUnique(args);
    if (!user) throw new UserNotFound();

    return user;
  }

  /**
   * @param id <number>
   * @param data <IUserInput>
   * @returns <UserModel> - the user filtered by profile fields
   */
  async editUser(id: number, data: IUserInput): Promise<UserModel> {
    if (Number.isNaN(id)) {
      throw new IDFormatException();
    }

    const args = Prisma.validator<Prisma.UserUpdateArgs>()({
      where: {
        id,
      },
      data: {
        ...data,
      },
      select: UserSelectProfile,
    });

    const user = await this.repo.update(args);
    if (!user) throw new UserNotFound();

    return user;
  }

  /**
   * Delete a user
   * @param id <number>
   */
  async deleteUser(id: number): Promise<void> {
    if (Number.isNaN(id)) {
      throw new IDFormatException();
    }

    const args: Prisma.UserDeleteArgs = {
      where: { id },
    };

    await this.repo.delete(args);
  }
}
