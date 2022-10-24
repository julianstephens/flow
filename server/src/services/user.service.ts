import { InvalidInput } from "@errors/common/invalidInput.error";
import { UserNotFound } from "@errors/index";
import { UserModel, UsersRepository } from "@generated/tsed";
import { IDFormatException } from "@interfaces/common.interfaces";
import { IUserInput, UserSelectProfile } from "@interfaces/user.interfaces";
import { Prisma } from "@prisma/client";
import { Inject, Injectable } from "@tsed/di";
import { hasNilProps, omitObjProps } from "src/utils/common.utils";

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
    const prismaInput = {
      fullName: input.fullName,
      shortName: input.shortName,
      email: input.email,
      dob: input.dob,
      address: {
        create: {
          streetAddress: input.address?.streetAddress,
          streetAddress2: input.address?.streetAddress2,
          city: input.address?.city,
          country: {
            connect: {
              code: input.address?.country,
            },
          },
          postalCode: input.address?.postalCode,
        },
      },
    };

    if (!prismaInput || hasNilProps(prismaInput)) throw new InvalidInput();

    const args = Prisma.validator<Prisma.UserCreateArgs>()({
      data: { ...(prismaInput as Prisma.UserCreateInput) },
    });

    const user = await this.repo.create(args);
    if (!user) throw new UserNotFound();

    return user;
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
   * @param input <IUserInput>
   * @returns <UserModel> - the user filtered by profile fields
   */
  async editUser(id: number, input: IUserInput): Promise<UserModel> {
    if (Number.isNaN(id)) {
      throw new IDFormatException();
    }

    const prismaInput: Prisma.UserUpdateInput = {
      fullName: input.fullName,
      shortName: input.shortName,
      email: input.email,
      dob: input.dob,
      address: {
        update: {
          streetAddress: input.address?.streetAddress,
          streetAddress2: input.address?.streetAddress2,
          city: input.address?.city,
          country: {
            connect: {
              code: input.address?.country,
            },
          },
          postalCode: input.address?.postalCode,
        },
      },
    };
    const args = Prisma.validator<Prisma.UserUpdateArgs>()({
      where: {
        id,
      },
      data: {
        ...(prismaInput as Prisma.UserUpdateInput),
      },
    });

    const user = await this.repo.update(args);
    if (!user) throw new UserNotFound();

    return omitObjProps(user, Object.keys(UserSelectProfile));
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
