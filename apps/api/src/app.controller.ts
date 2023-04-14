import { AppService } from "@/app.service";
import { APIRespDto } from "@/dtos/api";
import { APIResp } from "@/types";
import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({
    description: "API healthcheck",
    type: APIRespDto,
  })
  checkhealth(): APIResp {
    return this.appService.checkhealth();
  }
}
