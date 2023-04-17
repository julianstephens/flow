import { AppService } from "@/app.service";
import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOkResponse({
    description: "API healthcheck",
  })
  checkhealth() {
    return this.appService.checkhealth();
  }
}
