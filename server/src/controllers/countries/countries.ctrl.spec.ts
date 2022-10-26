import { PlatformTest } from "@tsed/common";
import { CountriesCtrl } from "./countries.ctrl";

describe("CountriesCtrl", () => {
  beforeAll(PlatformTest.create);
  afterAll(PlatformTest.reset);

  test("should be instanceof CountriesCtrl", async () => {
    expect.assertions(1);
    const instance: CountriesCtrl = await PlatformTest.invoke(CountriesCtrl);
    expect(instance).toBeInstanceOf(CountriesCtrl);
  });

  test("should get all countries", async () => {
    const instance: CountriesCtrl = await PlatformTest.invoke(CountriesCtrl);
    const response = await instance.get();
    expect(response).toHaveLength(250);
    expect(response[0]).toHaveProperty("id");
    expect(response[0]).toHaveProperty("abbrev");
    expect(response[0]).toHaveProperty("name");
    expect(response[0]).toHaveProperty("callingCodes");
  });

  test("should get all country abbreviations", async () => {
    const instance: CountriesCtrl = await PlatformTest.invoke(CountriesCtrl);
    const response = await instance.get(true);
    expect(response).toHaveLength(250);
    expect(response[0]).toHaveProperty("id");
    expect(response[0]).toHaveProperty("abbrev");
  });

  test("should get all country names", async () => {
    const instance: CountriesCtrl = await PlatformTest.invoke(CountriesCtrl);
    const response = await instance.get(false, true);
    expect(response).toHaveLength(250);
    expect(response[0]).toHaveProperty("id");
    expect(response[0]).toHaveProperty("name");
  });

  test("should get all country calling codes", async () => {
    const instance: CountriesCtrl = await PlatformTest.invoke(CountriesCtrl);
    const response = await instance.get(false, false, true);
    expect(response).toHaveLength(250);
    expect(response[0]).toHaveProperty("id");
    expect(response[0]).toHaveProperty("abbrev");
  });
});
