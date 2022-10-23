import { UserModel, UsersRepository } from "@generated/tsed";
import { IUserSearchParams, UserNotFound, UserNotFoundDesc } from "@interfaces/user.interfaces";
import { Prisma } from "@prisma/client";
import { Controller, Inject } from "@tsed/di";
import { BadRequest } from "@tsed/exceptions";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Description, Get, Name, Returns, Summary } from "@tsed/schema";
import lodash from "lodash";

@Controller("/users")
@Name("Users")
export class UserCtrl {
  @Inject()
  protected repo: UsersRepository;

  @Get("/:id")
  @Summary("Retrieve a single user by ID")
  @Returns(200, UserModel).Description("A user")
  @Returns(404).Description(UserNotFoundDesc)
  async get(@PathParams("id") @Description("User ID") id: number): Promise<UserModel> {
    if (Number.isNaN(id)) {
      const err = new BadRequest("Not a number");
      err.errors = [{ message: "ID is not a number" }];
      throw err;
    }

    const args: Prisma.UserFindUniqueArgs = {
      where: {
        id,
      },
    };

    const user = this.repo.findUnique(args);
    if (lodash.isNil(user)) throw UserNotFound();

    return user as any as UserModel;
  }

  @Get()
  @Summary("Retrieve users by name and/or email")
  @Returns(200, Array).Of(UserModel).Description("A list of users")
  @Returns(404).Description(UserNotFoundDesc)
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
    if (lodash.isNil(users)) throw UserNotFound();

    return users as any as UserModel[];
  }
}
