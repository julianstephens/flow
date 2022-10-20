import { Get, Route } from "tsoa";

export interface PingResponse {
  message: string;
}

@Route("ping")
export class PingController {
  @Get()
  async getMessage(): Promise<PingResponse> {
    return {
      message: "pong",
    };
  }
}
