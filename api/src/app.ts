import { logger } from "@utils/logger";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config()

const app: Express = express();
const port: number = process.env["PORT"] ? Number.parseInt(process.env["PORT"]) : 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('tiny'))

app.get("/ping", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at https://localhost:${port}`);
});
