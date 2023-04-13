import { AppService } from "@/app.service";
import { APIRespDto } from "@/dtos/api";
import { APIResp } from "@/types";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOkResponse } from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get()
  @ApiOkResponse({
    description: "API healthcheck",
    type: APIRespDto,
  })
  checkhealth(): APIResp {
    return this.appService.checkhealth();
  }
}
