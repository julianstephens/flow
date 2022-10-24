import { conf as helmetConf } from "@config/helmet/index";
import { conf as swaggerConf } from "@config/swagger/index";
import { conf as rootConf } from "@config/tsed/index";
import * as api from "@controllers/index";
import { PrismaService } from "@generated/tsed";
import { cacheMiddleware } from "@middleware/cache.middleware";
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
import methodOverride from "method-override";

const { CLIENT_URL, PORT } = process.env;
if (!CLIENT_URL || !PORT) throw Error("CLIENT env var not set.");

@Configuration({
  ...rootConf,
  acceptMimes: ["application/json"],
  httpPort: PORT,
  httpsPort: false, // CHANGE
  componentsScan: false,
  mount: {
    "/api": [...Object.values(api)],
  },
  swagger: swaggerConf,
  middlewares: [
    helmet(helmetConf),
    cors(),
    cookieParser(),
    compress({}),
    methodOverride(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true,
    }),
  ],
  views: {
    root: `${__dirname}/../views`,
    extensions: {
      ejs: "ejs",
    },
  },
  exclude: ["**/*.spec.ts"],
  logger: {
    disableRoutesSummary: false,
    perf: true,
  },
  passport: {},
  prisma: {
    errorFormat: "minimal",
  },
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Inject()
  protected prisma: PrismaService;

  @Configuration()
  protected settings: Configuration;

  public $afterInit(): void | Promise<any> {
    this.prisma.$use(cacheMiddleware);
  }
}
