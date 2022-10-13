import { Request, Response, Router } from "express";

export const router: Router = Router();

router.get("/ping", (req: Request, res: Response) => {
  res.send("Hello, world!");
});
