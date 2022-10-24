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
