import { AppModule } from "@/app.module";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { patchNestJsSwagger } from "nestjs-zod";
import env from "./utils/env";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  patchNestJsSwagger();
  const config = new DocumentBuilder()
    .setTitle(env.API_NAME ?? "Test")
    .setVersion(env.API_VERSION ?? "Test")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(3000);
}
bootstrap();
