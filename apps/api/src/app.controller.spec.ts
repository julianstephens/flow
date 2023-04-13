import { Test, TestingModule } from "@nestjs/testing";
import { StatusCodes } from "http-status-codes";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it("should return healthy checkhealth", () => {
      expect(appController.checkhealth()).toBe({
        status: StatusCodes.OK,
        message: "Healthy",
      });
    });
  });
});
