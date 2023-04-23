import { AppService } from "@/app.service";
import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";

@ApiBearerAuth("defaultBearerAuth")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({
    description: "API healthcheck",
  })
  checkhealth() {
    return this.appService.checkhealth();
  }
}
