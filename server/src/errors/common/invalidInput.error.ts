import { PrismaClientValidationError } from "@prisma/client/runtime";
import { BadRequest } from "@tsed/exceptions";

export class InvalidInput extends BadRequest {
  constructor(prop: string | null = null) {
    super(
      `Invalid input${
        prop ? `: error at property \`${prop}\`` : ""
      }. Please review your request and try again.`,
    );
  }
}

export const errOrValidationError = (err: Error): Error => {
  if (err instanceof PrismaClientValidationError) {
    return new InvalidInput();
  }
  return err;
};
