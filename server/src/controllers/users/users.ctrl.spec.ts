import { PlatformTest } from "@tsed/common";
import { UserCtrl } from "./users.ctrl";

describe("UserCtrl", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  test("should be instanceof UserCtrl", () => {
    const instance = PlatformTest.get<UserCtrl>(UserCtrl);
    expect(instance).toBeInstanceOf(UserCtrl);
  });
});
