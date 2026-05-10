// shared/middlewa
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/base.error.js";
import { logger } from "../logger/logger.js";

function errorHandler(
  err: any, // Use any or Error to access properties easily
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const isUnexpected = !(err instanceof BaseError || err instanceof ZodError);
  
  if (isUnexpected) {
    logger.error({ 
        msg: err.message, 
        stack: err.stack, 
        path: req.path 
    }, "Unhandled Exception");
  }

  // 2. Handle Zod Errors (Input validation)
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      code: "VALIDATION_ERROR",
      message: "Invalid input data",
      errors: err
    });
    return;
  }

  // 3. Handle Domain Errors (Business logic)
  if (err instanceof BaseError) {
    res.status(401).json({
      success: false,
      code: 401,
      message: err.message
    });
    return;
  }

  // 4. Final Catch-all (Internal Server Error)
  res.status(500).json({
    success: false,
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred"
  });
}

export { errorHandler };
