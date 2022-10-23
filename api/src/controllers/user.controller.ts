import { User } from "@prisma/client";
import * as tsoa from "tsoa";
import UserRepository from "../db/repositories/user.repo.js";
import UserService from "../services/user.services.js";

interface IHttpError {
  message: string;
  additionalInfo?: any;
}

@tsoa.Route("users")
export class UsersController extends tsoa.Controller {
  userRepo: UserRepository = new UserRepository();

  userSVC: UserService = new UserService(this.userRepo);

  @tsoa.Get("{userId}")
  async GetUserById(
    @tsoa.Path() userId: number,
    @tsoa.Res() notFoundResponse: tsoa.TsoaResponse<404, IHttpError>,
  ): Promise<User> {
    const user = await this.userSVC.getUserById(userId);

    if (!user) {
      return notFoundResponse(404, { message: "User not found." });
    }

    return user;
  }

  // @tsoa.Post("/")
  // @tsoa.SuccessResponse("201", "User created.")
  // async CreateUser(@tsoa.Body() req: Prisma.UserCreateInput): Promise<User> {
  //   this.setStatus(201);
  //   return this.userSVC.createUser(req);
  // }
}
