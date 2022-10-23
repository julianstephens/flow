import { InternalServerError } from "@tsed/exceptions";

export class UserModifyError extends InternalServerError {
  constructor(create = false) {
    super(`Could not ${create ? "create" : "modify"} user.`);
  }
}
