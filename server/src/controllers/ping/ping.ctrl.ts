import { Controller } from "@tsed/di";
import { Get, Name } from "@tsed/schema";

@Controller("/ping")
@Name("Ping")
export class PingCtrl {
  @Get()
  get(): string {
    return "Pong";
  }
}
