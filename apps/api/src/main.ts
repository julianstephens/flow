import { AppModule } from "@/app.module";
import { Auth0Resp } from "@/types";
import env from "@/utils/env";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import axios from "axios";
import { patchNestJsSwagger } from "nestjs-zod";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  patchNestJsSwagger();
  const config = new DocumentBuilder()
    .setTitle(env.API_NAME ?? "Test")
    .setVersion(env.API_VERSION ?? "Test")
    .addBearerAuth(undefined, "defaultBearerAuth")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  /** ==== FOR TESTING ONLY ==== */
  // automatically sets auth0 bearer
  const req = {
    client_id: env.AUTH0_PM_CLIENT_ID,
    client_secret: env.AUTH0_PM_CLIENT_SECRET,
    audience: env.AUTH0_AUDIENCE,
    grant_type: "client_credentials",
  };
  const url = `https://${env.AUTH0_DOMAIN}/oauth/token`;
  const {
    data: { access_token },
  } = await axios.post<Auth0Resp>(url, req, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });

  const options = {
    swaggerOptions: {
      authAction: {
        defaultBearerAuth: {
          name: "defaultBearerAuth",
          schema: {
            description: "Default",
            type: "http",
            in: "header",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
          value: access_token,
        },
      },
    },
  };
  /** ======================= */

  SwaggerModule.setup("docs", app, document, options);

  await app.listen(3000);
}

bootstrap();
