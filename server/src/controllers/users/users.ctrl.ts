import { errOrValidationError } from "@errors/common/invalidInput.error";
import { UserNotFound } from "@errors/index";
import { UserModel } from "@generated/tsed";
import { StatusCodes } from "@interfaces/common.interfaces";
import {
    IUserInput,
    UserCreateExample,
    UserExistsDesc,
    UserNotFoundDesc
} from "@interfaces/user.interfaces";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { UserService } from "@services/user.service";
import { Controller } from "@tsed/di";
import { BadRequest } from "@tsed/exceptions";
import { BodyParams, PathParams } from "@tsed/platform-params";
import {
    Delete,
    Description,
    Example,
    Get,
    Groups,
    Name,
    Post,
    Put,
    Required,
    Returns,
    Summary
} from "@tsed/schema";

@Controller("/users")
@Name("Users")
export class UserCtrl {
  constructor(private userSVC: UserService) {}

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
      if (err instanceof PrismaClientKnownRequestError) {
        throw new BadRequest(UserExistsDesc);
      }
      throw errOrValidationError(err);
    }
  }

  @Get("/:id")
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
      const user: UserModel = await this.userSVC.editUser(id, data);
      return user;
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.message.toLowerCase().includes("not found")
      ) {
        throw new UserNotFound();
      }
      throw errOrValidationError(err);
    }
  }

  @Delete("/:id")
  @Summary("Delete a user")
  @Returns(StatusCodes.NO_CONTENT)
  @Returns(StatusCodes.NOT_FOUND).Description(UserNotFoundDesc)
  async delete(@PathParams("id") @Description("User ID") id: number): Promise<void> {
    try {
      await this.userSVC.deleteUser(id);
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.message.toLowerCase().includes("not found")
      ) {
        throw new UserNotFound();
      }

      throw errOrValidationError(err);
    }
  }
}
