import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import "module-alias/register";
import morgan from "morgan";

import "./controllers/ping.controller.js";

import { RegisterRoutes } from "./routes/routes.js";

import { DBContext as db } from "./db/db-context.js";
import handleError from "./middlewares/error-handler.middleware.js";
import { checkJWT } from "./middlewares/jwt.middleware.js";
import { logger } from "./utils/logger.js";

dotenv.config();

db.init();

const app: express.Express = express();
const port: number = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

const { CLIENT } = process.env;
if (!CLIENT) throw Error("AppError: CLIENT env var not set");

const opts: cors.CorsOptions = {
  origin: [CLIENT],
};

app.use(helmet());
app.use(cors(opts));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkJWT.unless({ path: ["api/auth/login", "api/auth/register"] }));
app.use(morgan("dev"));
app.use(handleError);

RegisterRoutes(app);

app.listen(port, () => {
  logger.info(`⚡️ [server]: Server is running at https://localhost:${port}`);
});
