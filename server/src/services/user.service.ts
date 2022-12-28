import { IDFormatException, InvalidInput, UserNotFound } from "@errors/index";
import { UserModel, UsersRepository } from "@generated/tsed";
import { IUserInput, UserSelectProfile } from "@interfaces/user.interfaces";
import { Prisma } from "@prisma/client";
import { Inject, Service } from "@tsed/di";
import { hasNilProps, omitObjProps } from "@utils/common.utils";

@Service()
export class UserService {
  @Inject()
  protected repo: UsersRepository;

  /**
   * Create a user
   * @param input <IUserInput>
   * @returns <UserModel> - the created user filtered by profile fields
   */
  async createUser(input: IUserInput): Promise<UserModel> {
    const prismaInput = {
      fullName: input.fullName,
      shortName: input.shortName,
      email: input.email,
      dob: input.dob,
      address: input.address,
    };

    if (!prismaInput || hasNilProps(prismaInput)) throw new InvalidInput();

    const args = Prisma.validator<Prisma.UserCreateArgs>()({
      data: { ...(prismaInput as Prisma.UserCreateInput) },
    });

    const user = await this.repo.create(args);
    if (!user) throw new UserNotFound();

    return omitObjProps(user, UserSelectProfile);
  }

  /**
   * Retrieve a single user by email
   * @param email <string>
   * @returns <UserModel> - the found user
   */
  async getUserByEmail(email: string): Promise<UserModel> {
    const args: Prisma.UserFindUniqueArgs = {
      where: {
        email,
      },
    };

    const user = await this.repo.findUnique(args);
    if (!user) throw new UserNotFound();

    return omitObjProps(user, UserSelectProfile);
  }

  /**
   * Retrieve a single user by ID
   * @param id <number>
   * @returns <UserModel> - the user filtered by profile fields
   */
  async getUserById(id: number): Promise<UserModel> {
    if (Number.isNaN(id) || id < 1) {
      throw new IDFormatException();
    }

    const args: Prisma.UserFindUniqueArgs = {
      where: {
        id,
      },
    };

    const user = await this.repo.findUnique(args);
    if (!user) throw new UserNotFound();

    return omitObjProps(user, UserSelectProfile);
  }

  /**
   * @param id <number>
   * @param input <IUserInput>
   * @returns <UserModel> - the user filtered by profile fields
   */
  async editUser(id: number, input: IUserInput): Promise<UserModel> {
    if (Number.isNaN(id) || id < 1) {
      throw new IDFormatException();
    }

    const prismaInput: Prisma.UserUpdateInput = {
      fullName: input.fullName,
      shortName: input.shortName,
      email: input.email,
      dob: input.dob,
    };
    const args = Prisma.validator<Prisma.UserUpdateArgs>()({
      where: {
        id,
      },
      data: {
        ...(prismaInput as Prisma.UserUpdateInput),
      },
    });

    if (hasNilProps(args.data)) throw new InvalidInput();

    const user = await this.repo.update(args);

    return omitObjProps(user, UserSelectProfile);
  }

  /**
   * Delete a user
   * @param id <number>
   */
  async deleteUser(id: number): Promise<void> {
    if (Number.isNaN(id) || id < 1) {
      throw new IDFormatException();
    }

    const args: Prisma.UserDeleteArgs = {
      where: { id },
    };

    await this.repo.delete(args);
  }
}
