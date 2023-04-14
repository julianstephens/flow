import { UserService } from "@/user/user.service";
import { Controller } from "@nestjs/common";

@Controller()
export class UserController {
  constructor(private readonly userSVC: UserService) {}

  _exclude<UserDto, Key extends keyof UserDto>(
    user: UserDto,
    keys: Key[]
  ): Omit<UserDto, Key> {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }

  // @Get()
  // @ApiOkResponse({
  //   description: "Retrieve a specific user",
  //   type: UserDto,
  // })
  // find(@Param("query") query: Prisma.UserWhereUniqueInput): APIResp<User | null> {
  //   return this.userSVC.find(query);
  // }
}
