import handleError from "@middlewares/error-handler.middleware";
import { checkJWT } from "@middlewares/jwt.middleware";
import { logger } from "@utils/logger";
import bodyParser from "body-parser";
import cors from "cors";
import { DBContext as db } from "db/db-context";
import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { router as pong } from "@routes/pong.routes";

dotenv.config();

db.init();

const app: Express = express();
const port: number = process.env.PORT
  ? Number.parseInt(process.env.PORT)
  : 3000;

const opts: cors.CorsOptions = {
  origin: ["http://localhost:4200"],
};

app.use(helmet());
app.use(cors(opts));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(checkJWT.unless({ path: ["api/auth/login", "api/auth/register"] }));
app.use(morgan("dev"));
app.use(handleError);

const api = express.Router();
api.use("/", pong);

app.use("/api", api);

app.listen(port, () => {
  logger.info(`⚡️ [server]: Server is running at https://localhost:${port}`);
});
