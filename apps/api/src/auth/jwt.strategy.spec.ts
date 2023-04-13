import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { JWTStrategy } from "./jwt.strategy";

describe("JWTStrategy", () => {
  let jwtStrategy: JWTStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [JWTStrategy],
    }).compile();

    jwtStrategy = module.get<JWTStrategy>(JWTStrategy);
  });

  describe("validate", () => {
    it("should return payload", () => {
      const mockPayload = {
        exp: 7400,
      };

      expect(jwtStrategy.validate(mockPayload)).toBe(mockPayload);
    });

    it("should throw unathorized exception for empty payload", () => {
      expect(() => jwtStrategy.validate({})).toThrow();
    });
  });
});
