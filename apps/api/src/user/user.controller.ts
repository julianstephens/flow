import { UserService } from "@/user/user.service";
import { Controller } from "@nestjs/common";

@Controller()
export class UserController {
  constructor(private readonly userSVC: UserService) {}
}
