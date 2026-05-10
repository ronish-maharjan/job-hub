// Express setup only
// Registers middleware
// Registers all module routes
// No server starting here
// No DB connection here

import express, { Application, Request, Response } from "express"
import helmet from "helmet"
import {pinoHttp} from "pino-http"
import { createJobModule } from "./modules/job/job.module.js"
import { errorHandler } from "./shared/middlewares/error-handler.middleware.js"
import { logger } from "./shared/logger/logger.js"
import { env } from "./shared/configs/env.js"

function createApp(): Application {
  const app = express()

  // ─── Security Middleware ───────────────────────────
  app.use(helmet())
  app.set("trust proxy", 1)

  // ─── Request Logging ───────────────────────────────
  app.use(
    pinoHttp({
      logger,
      customLogLevel(req, res) {
        if (res.statusCode >= 500) return "error"
        if (res.statusCode >= 400) return "warn"
        return "info"
      },
    })
  )

  // ─── Body Parsing ──────────────────────────────────
  app.use(express.json({ limit: "10kb" }))

  // ─── Health Check ──────────────────────────────────
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      ok: true,
      status: "healthy",
      environment: env.ENVIRONMENT,
      timestamp: new Date().toISOString(),
    })
  })

  // ─── Modules ───────────────────────────────────────
  // Each module wires itself
  // App just registers the router
  const jobModule = createJobModule()
  app.use("/api/jobs", jobModule.router)

  // ─── 404 Handler ───────────────────────────────────
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      ok: false,
      code: "NOT_FOUND",
      message: "Route not found",
    })
  })

  // ─── Global Error Handler ──────────────────────────
  // MUST be last
  app.use(errorHandler)

  return app
}

export { createApp }
