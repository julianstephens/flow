import { UserModel, UsersRepository } from "@generated/tsed";
import { IDFormatException, StatusCodes } from "@interfaces/common.interfaces";
import {
  IUserInput,
  IUserSearchParams,
  UserCreateExample,
  UserNotFoundDesc,
} from "@interfaces/user.interfaces";
import { Prisma } from "@prisma/client";
import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Description, Example, Get, Name, Post, Returns, Summary } from "@tsed/schema";
import lodash from "lodash";
import { UserModifyError, UserNotFound } from "src/errors";

@Controller("/users")
@Name("Users")
export class UserCtrl {
  @Inject()
  protected repo: UsersRepository;

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
    };

    const user = this.repo.findUnique(args);
    if (lodash.isNil(user)) throw new UserNotFound();

    return user as any as UserModel;
  }

  @Post()
  @Summary("Create a user")
  @Returns(StatusCodes.CREATED, UserModel)
  async create(
    @Example(UserCreateExample) @BodyParams("data") data: IUserInput,
  ): Promise<UserModel> {
    const args: Prisma.UserCreateInput = {
      ...data,
      passwordHash: "",
    };
    const user = await this.repo.create({ data: args });
    if (lodash.isNil(user)) throw new UserModifyError();

    return user;
  }

  @Get()
  @Summary("Retrieve users by name and/or email")
  @Returns(StatusCodes.OK, Array).Of(UserModel).Description("A list of users")
  @Returns(StatusCodes.NOT_FOUND).Description(UserNotFoundDesc)
  async find(@BodyParams("params") params: IUserSearchParams): Promise<UserModel[]> {
    const args: Prisma.UserFindManyArgs = {};

    if (params.limit) {
      args.take = params.limit;
    }
    if (params.email) {
      args.where = { ...args.where, email: params.email };
    }
    if (params.fullName) {
      args.where = { ...args.where, fullName: params.fullName };
    }
    if (params.shortName) {
      args.where = { ...args.where, shortName: params.shortName };
    }
    if (params.orderBy) {
      args.orderBy = {};
      args.orderBy[params.orderBy.prop as keyof Prisma.UserOrderByWithRelationInput] =
        params.orderBy.direction;
    }

    const users = this.repo.findMany(args);
    if (lodash.isNil(users)) throw new UserNotFound();

    return users as any as UserModel[];
  }
}
