import { Request, Response, NextFunction } from "express";
import { env } from "../configs/env.js";

function apiKey(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const key = req.headers["x-api-key"];

  if (!key || key !== env.API_KEY) {
    res.status(401).json({
      ok: false,
      code: "UNAUTHORIZED",
      message: "Invalid or missing API key",
    });
    return;
  }

  next();
}

export { apiKey };
