import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { AuthModule } from "@/auth/auth.module";
import { UserModule } from "@/user/user.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { ZodValidationPipe } from "nestjs-zod";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard("jwt"),
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    }
  ],
})
export class AppModule {}
