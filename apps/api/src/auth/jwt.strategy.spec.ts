import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { JwtStrategy } from "./jwt.strategy";

describe("JWTStrategy", () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
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
