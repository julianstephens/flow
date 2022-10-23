import { UserModel, UsersRepository } from "@generated/tsed";
import { IDFormatException, StatusCodes } from "@interfaces/common.interfaces";
import {
    IUserInput,
    IUserSearchFilters,
    UserCreateExample,
    UserNotFoundDesc,
    UserSearchParamsExample,
    UserSelectProfile
} from "@interfaces/user.interfaces";
import { Prisma } from "@prisma/client";
import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Description, Example, Get, Groups, Name, Post, Put, Returns, Summary } from "@tsed/schema";
import lodash from "lodash";
import { UserModifyError, UserNotFound } from "src/errors";

@Controller("/users")
@Name("Users")
export class UserCtrl {
  @Inject()
  protected repo: UsersRepository;

  @Get("/search")
  @Summary("Filter users by name or email")
  @Returns(StatusCodes.OK, Array).Of(UserModel).Description("A list of users")
  @Returns(StatusCodes.NOT_FOUND).Description(UserNotFoundDesc)
  async search(@Example(UserSearchParamsExample) @BodyParams("filters") filters: IUserSearchFilters): Promise<UserModel[]> {
    const args: Prisma.UserFindManyArgs = { select: UserSelectProfile };
    
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

    const users = this.repo.findMany(args);
    if (!users || lodash.isNil(users)) throw new UserNotFound();

    return users as any as UserModel[];
  }

  @Post()
  @Summary("Create a user")
  @Returns(StatusCodes.CREATED, UserModel)
  async create(
    @Example(UserCreateExample) @Groups("creation") @BodyParams("data") data: IUserInput,
  ): Promise<UserModel> {
    const args: Prisma.UserCreateInput = { ...data };
    const user = await this.repo.create({ data: args });
    if (!user || lodash.isNil(user)) throw new UserModifyError();

    return user;
  }

  @Get("/:id")
  @Summary("Retrieve a single user by ID")
  @Returns(StatusCodes.OK, UserModel).Description("A user")
  @Returns(StatusCodes.NOT_FOUND).Description(UserNotFoundDesc)
  async get(@PathParams("id") @Description("User ID") id: number): Promise<UserModel> {
    if (Number.isNaN(id)) {
      throw new IDFormatException();
    }

    const args: Prisma.UserFindUniqueArgs = {
      where: {
        id,
      },
      select: UserSelectProfile,
    };

    const user = this.repo.findUnique(args);
    if (!user || lodash.isNil(user)) throw new UserNotFound();

    return user as any as UserModel;
  }
 
  @Put("/:id")
  @Summary("Update a user")
  @Returns(StatusCodes.OK, UserModel).Description("The updated user")
  @Returns(StatusCodes.NOT_FOUND).Description(UserNotFoundDesc)
  async edit(@PathParams("id") @Description("User ID") id: number, @Example(UserCreateExample) @BodyParams("data") data: IUserInput): Promise<UserModel> {
    const args: Prisma.UserUpdateArgs = { 
      where: {
        id
      },
      data: {
        ...data
      }
    } 
    
    const user = await this.repo.update(args)
    if (!user || lodash.isNil(user)) throw new UserNotFound();

    return user as any as UserModel;
  }
}
