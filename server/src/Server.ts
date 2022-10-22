import "@tsed/ajv";
import { PlatformApplication } from "@tsed/common";
import { Configuration, Inject } from "@tsed/di";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/swagger";
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import methodOverride from "method-override";
import { config } from "./config/index";
import * as api from "./controllers/index";

const { CLIENT_URL, PORT } = process.env;
if (!CLIENT_URL || !PORT) throw "CLIENT env var not set.";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: PORT,
  httpsPort: false, // CHANGE
  componentsScan: false,
  mount: {
    "/api": [...Object.values(api)],
  },
  swagger: [
    {
      path: "/doc",
      specVersion: "3.0.1",
    },
  ],
  middlewares: [
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, "data:", "validator.swagger.io"],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    }),
    cors(),
    cookieParser(),
    compress({}),
    methodOverride(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true,
    }),
  ],
  exclude: ["**/*.spec.ts"],
  logger: {
    debug: true,
    disableRoutesSummary: false,
    logRequest: false,
    requestFields: ["reqId", "method", "url", "headers", "query", "params", "duration"],
  },
  passport: {},
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;

  public $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(
        helmet({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: [`'self'`],
              styleSrc: [`'self'`, `'unsafe-inline'`],
              imgSrc: [`'self'`, "data:", "validator.swagger.io"],
              scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            },
          },
        }),
      )
      .use(cors())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(cookieParser())
      .use(methodOverride());
    // .use(MorganMiddleware)
    // .use(MetadataMiddleware);
  }
}
