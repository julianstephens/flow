import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";

@Controller("/ping")
export class PingCtrl {
  @Get()
  get(): string {
    return "Pong";
  }
}
