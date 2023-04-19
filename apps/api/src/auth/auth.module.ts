import { PlaidService } from "@/plaid.service";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  providers: [JwtStrategy, AuthService, PlaidService],
  exports: [PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
