import { UserNotFoundDesc } from "@interfaces/user.interfaces";
import { NotFound } from "@tsed/exceptions";

export class UserNotFound extends NotFound {
  constructor() {
    super(UserNotFoundDesc);
  }
}
