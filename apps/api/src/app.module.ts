import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { PrismaService } from "@/prisma.service";
import { UserService } from "@/services/user/user.service";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" })],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
