import { logger } from "@utils/logger";
import bodyParser from "body-parser";
import cors from "cors";
import { DBContext as db } from "db/db-context";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import handleError from "middlewares/error-handler";
import morgan from "morgan";

dotenv.config();

db.init();

const app: Express = express();
const port: number = Number.parseInt(process.env["PORT"]) || 3000;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(handleError);

app.get("/ping", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  logger.info(`⚡️ [server]: Server is running at https://localhost:${port}`);
});
