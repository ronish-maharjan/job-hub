import { Request, Response, NextFunction } from "express";
import { ZodError,z } from "zod";
import { logger } from "../logger/logger.js";

function validate(schema: z.ZodTypeAny,source:"body"|"params") {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.debug(req[source]);
      await schema.parseAsync(req[source]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          ok: false,
          code: "VALIDATION_ERROR",
          errors:error.issues,
        });
        return;
      }
      next(error);
    }
  };
}

export { validate };
