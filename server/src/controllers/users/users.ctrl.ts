import { InvalidInput } from "@errors/common/invalidInput.error";
import { UserNotFound } from "@errors/index";
import { UserModel, UsersRepository } from "@generated/tsed";
import { StatusCodes } from "@interfaces/common.interfaces";
import { IUserInput, UserCreateExample, UserNotFoundDesc } from "@interfaces/user.interfaces";
import { Prisma } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import {
  Delete,
  Description,
  Example,
  Groups,
  Name,
  Post,
  Put,
  Required,
  Returns,
  Summary,
} from "@tsed/schema";
import { UserService } from "src/services/user.service";

@Controller("/users")
@Name("Users")
export class UserCtrl {
  @Inject()
  protected repo: UsersRepository;

  @Inject()
  protected userSVC: UserService;

  @Post()
  @Summary("Create a user")
  @Returns(StatusCodes.CREATED, UserModel)
  async create(
    @Example(UserCreateExample)
    @Groups("creation")
    @BodyParams("input")
    @Required()
    input: IUserInput,
  ): Promise<UserModel> {
    try {
      const data: UserModel = await this.userSVC.createUser(input);
      return data;
    } catch (err) {
      if (err instanceof PrismaClientValidationError) {
        const prop = err.message.split("`")[1];
        throw new InvalidInput(prop);
      }
      throw err;
    }
  }

  @Summary("Retrieve a single user by ID")
  @Returns(StatusCodes.OK, UserModel).Description("A user")
  @Returns(StatusCodes.NOT_FOUND).Description(UserNotFoundDesc)
  async get(@PathParams("id") @Description("User ID") id: number): Promise<UserModel> {
    const data: UserModel = await this.userSVC.getUser(id);
    return data;
  }

  @Put("/:id")
  @Summary("Update a user")
  @Returns(StatusCodes.OK, UserModel).Description("The updated user")
  @Returns(StatusCodes.NOT_FOUND).Description(UserNotFoundDesc)
  async edit(
    @PathParams("id") @Description("User ID") id: number,
    @Example(UserCreateExample) @BodyParams("data") data: IUserInput,
  ): Promise<UserModel> {
    try {
      const user = this.userSVC.editUser(id, data);
      return user;
    } catch (err) {
      if (err instanceof PrismaClientValidationError) {
        const prop = err.message.split(``)[1];
        throw new InvalidInput(prop);
      }
      throw err;
    }
  }

  @Delete("/:id")
  @Summary("Delete a user")
  @Returns(StatusCodes.NO_CONTENT)
  @Returns(StatusCodes.NOT_FOUND).Description(UserNotFoundDesc)
  async delete(@PathParams("id") @Description("User ID") id: number): Promise<void> {
    try {
      this.userSVC.deleteUser(id);
    } catch (err) {
      if (err instanceof Prisma.NotFoundError) {
        throw new UserNotFound();
      }
      throw err;
    }
  }
}
