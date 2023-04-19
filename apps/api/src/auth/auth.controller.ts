import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  @Get("/link")
  createLinkToken() {}
}
