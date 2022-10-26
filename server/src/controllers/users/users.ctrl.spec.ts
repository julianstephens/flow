import { IDFormatException, InvalidInput, UserNotFound } from "@errors/index";
import { UserModel } from "@generated/tsed";
import { IUserInput } from "@interfaces/user.interfaces";
import { PlatformTest } from "@tsed/common";
import { BadRequest } from "@tsed/exceptions";
import { UserCtrl } from "./users.ctrl";

const input: IUserInput = {
  fullName: "Test 1",
  shortName: "Test",
  email: "test.1@xyz.com",
  dob: 991428224,
  address: {
    streetAddress: "469 Higashiyama",
    city: "Kanan",
    region: "Osaka",
    country: "JPN",
    postalCode: "585-8555",
  },
};

const badInput = {
  test: "test",
};

const update: IUserInput = {
  fullName: "John Doe",
  shortName: "John",
};

const user = new UserModel();
Object.assign(user, {
  fullName: "Test 1",
  shortName: "Test",
  email: "test.1@xyz.com",
  dob: 991428224,
  address: {
    streetAddress: "469 Higashiyama",
    city: "Kanan",
    region: "Osaka",
    country: "JPN",
    postalCode: "585-8555",
  },
});

const john = new UserModel();
Object.assign(john, {
  fullName: "John Doe",
  shortName: "John",
  email: "test.1@xyz.com",
  dob: 991428224,
  address: {
    streetAddress: "969 Higashiyama",
    city: "Kanan",
    region: "Osaka",
    country: "JPN",
    postalCode: "585-8555",
  },
});

let id: number;

describe("UserCtrl", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  test("should be instanceof UserCtrl", async () => {
    expect.assertions(1);
    const instance: UserCtrl = await PlatformTest.invoke(UserCtrl);
    expect(instance).toBeInstanceOf(UserCtrl);
  });

  describe("UserCtrl.create(input: IUserInput)", () => {
    test("should create user", async () => {
      expect.assertions(3);
      const instance: UserCtrl = await PlatformTest.invoke(UserCtrl);
      const response = await instance.create(input);
      id = response.id;
      expect(response).toHaveProperty("fullName", user.fullName);
      expect(response).toHaveProperty("shortName", user.shortName);
      expect(response).toHaveProperty("email", user.email);
    });

    test("should throw invalid input error", async () => {
      expect.assertions(1);
      const instance: UserCtrl = await PlatformTest.invoke(UserCtrl);
      const invalid = async () => await instance.create(badInput as IUserInput);
      expect(invalid()).rejects.toThrow(InvalidInput);
    });

    test("should throw user exists error", async () => {
      expect.assertions(1);
      const instance: UserCtrl = await PlatformTest.invoke(UserCtrl);
      const badReq = async () => await instance.create(input);
      expect(badReq()).rejects.toThrow(BadRequest);
    });
  });

  describe("UserCtrl.get(id: number)", () => {
    test("should get user", async () => {
      expect.assertions(4);
      const instance: UserCtrl = await PlatformTest.invoke(UserCtrl);
      const response = await instance.get(id);
      expect(response).toHaveProperty("id", id);
      expect(response).toHaveProperty("fullName", user.fullName);
      expect(response).toHaveProperty("shortName", user.shortName);
      expect(response).toHaveProperty("email", user.email);
    });

    test("should throw invalid id error", async () => {
      expect.assertions(1);
      const instance: UserCtrl = await PlatformTest.invoke(UserCtrl);
      const id = async () => await instance.get(-1);
      expect(id()).rejects.toThrow(IDFormatException);
    });

    test("should throw user not found error", async () => {
      expect.assertions(1);
      const instance: UserCtrl = await PlatformTest.invoke(UserCtrl);
      const notFound = () => instance.get(1000);
      await expect(notFound()).rejects.toThrow(UserNotFound);
    });
  });

  describe("UserCtrl.edit(id: number, data: IUserInput)", () => {
    test("should update user", async () => {
      expect.assertions(4);
      const instance: UserCtrl = await PlatformTest.invoke(UserCtrl);
      const response = await instance.edit(id, update);
      expect(response).toHaveProperty("id", id);
      expect(response).toHaveProperty("fullName", john.fullName);
      expect(response).toHaveProperty("shortName", john.shortName);
      expect(response).toHaveProperty("email", john.email);
    });

    test("should throw invalid id error", async () => {
      expect.assertions(1);
      const instance: UserCtrl = await PlatformTest.invoke(UserCtrl);
      const id = async () => await instance.edit(-1, update);
      await expect(id()).rejects.toThrow(IDFormatException);
    });

    test("should throw invalid input error", async () => {
      expect.assertions(1);
      const instance: UserCtrl = await PlatformTest.invoke(UserCtrl);
      const invalid = async () => await instance.edit(id, badInput as IUserInput);
      expect(invalid()).rejects.toThrow(InvalidInput);
    });

    test("should throw user not found error", async () => {
      expect.assertions(1);
      const instance: UserCtrl = await PlatformTest.invoke(UserCtrl);
      const notFound = () => instance.edit(1000, update);
      await expect(notFound()).rejects.toThrow(UserNotFound);
    });
  });

  describe("UserCtrl.delete(id: number)", () => {
    test("should delete user", async () => {
      expect.assertions(1);
      const instance: UserCtrl = await PlatformTest.invoke(UserCtrl);
      const response = await instance.delete(id);
      expect(response).toBeUndefined();
    });

    test("should throw invalid id error", async () => {
      expect.assertions(1);
      const instance: UserCtrl = await PlatformTest.invoke(UserCtrl);
      const id = async () => await instance.delete(-1);
      expect(id()).rejects.toThrow(IDFormatException);
    });

    test("should throw user not found error", async () => {
      expect.assertions(1);
      const instance: UserCtrl = await PlatformTest.invoke(UserCtrl);
      const notFound = () => instance.delete(1000);
      await expect(notFound()).rejects.toThrow(UserNotFound);
    });
  });
});
