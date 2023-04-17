import { Injectable } from "@nestjs/common";
import { StatusCodes } from "http-status-codes";

@Injectable()
export class AppService {
  checkhealth() {
    return {
      status: StatusCodes.OK,
      message: "Healthy",
    };
  }
}
