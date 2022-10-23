import { PrismaService } from "@generated/tsed";
import "@tsed/ajv";
import { PlatformApplication } from "@tsed/common";
import { Configuration, Inject } from "@tsed/di";
import "@tsed/platform-cache";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/swagger";
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import lodash from "lodash";
import methodOverride from "method-override";
import morgan from "morgan";
import { config } from "./config/index";
import * as api from "./controllers/index";
import { CacheMiddleware } from "./middleware/cache.middleware";

const { CLIENT_URL, PORT, REDIS_HOST, REDIS_PORT } = process.env;
if (!CLIENT_URL || !PORT || !REDIS_HOST || !REDIS_PORT) throw Error("CLIENT env var not set.");

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
      cssPath: `${__dirname}/../views/swaggerDark.css`,
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
    morgan("dev"),
  ],
  views: {
    root: `${__dirname}/../views`,
    extensions: {
      ejs: "ejs",
    },
  },
  exclude: ["**/*.spec.ts"],
  logger: {
    debug: true,
    disableRoutesSummary: false,
    logRequest: false,
    requestFields: ["reqId", "method", "url", "headers", "query", "params", "duration"],
  },
  passport: {},
  ioredis: [
    {
      name: "default",
      cache: true,
      host: REDIS_HOST,
      port: lodash.toInteger(REDIS_PORT),
    },
  ],
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Inject()
  protected prisma: PrismaService;

  @Configuration()
  protected settings: Configuration;

  public $beforeRoutesInit(): void | Promise<any> {
    this.prisma.$use(new CacheMiddleware().cacheMiddleware());
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
      .use(methodOverride())
      .use(morgan("dev"));

  }
}
