import { SwaggerSettings } from "@tsed/swagger";

export const conf = [
  {
    path: "/doc",
    specVersion: "3.0.1",
    cssPath: `${__dirname}/../../../views/swaggerDark.css`,
    spec: {
      info: {
        title: "Flow: A Modern Budgeting Solution",
        license: {
          name: "MIT",
        },
      },
    },
    components: {
      securitySchemes: {
        oauth_jwt: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "",
        },
      },
    },
  },
] as any as SwaggerSettings[];
