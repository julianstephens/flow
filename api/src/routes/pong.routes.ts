import { Request, Response, Router } from "express";

export const router: Router = Router();

router.get("/ping", (_req: Request, res: Response) => {
  res.json({ data: "Hello, world!" });
});
