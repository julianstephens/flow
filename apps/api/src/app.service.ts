import { Injectable } from "@nestjs/common";
import { StatusCodes } from "http-status-codes";
import { APIResp } from "./types";

@Injectable()
export class AppService {
  checkhealth(): APIResp {
    return {
      status: StatusCodes.OK,
      message: "Healthy",
    };
  }
}
