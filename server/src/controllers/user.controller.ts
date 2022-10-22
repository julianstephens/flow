import { UserModel, UsersRepository } from "@generated/tsed";
import { Controller, Inject } from "@tsed/di";
import { BadRequest, NotFound } from "@tsed/exceptions";
import { PathParams } from "@tsed/platform-params";
import { Description, Get, Returns } from "@tsed/schema";
import lodash from "lodash";

@Controller("/users")
export class UserCtrl {
  @Inject()
  protected repo: UsersRepository;

  @Get("/:id")
  @Description("Retrieve a single user by ID")
  @Returns(200, UserModel)
  @Returns(404).Description("User not found")
  async get(@PathParams("id") @Description("User ID") id: number): Promise<UserModel> {
    if (isNaN(id)) {
      const err = new BadRequest("Not a number");
      err.errors = [{ message: "ID is not a number" }];
      throw err;
    }

    const args = {
      where: {
        id,
      },
    };

    const user = this.repo.findUnique(args);
    if (lodash.isNil(user)) throw new NotFound("User not found");

    return user as any as UserModel;
  }
}
