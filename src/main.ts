import { env } from "./shared/configs/env.js"
import { createApp } from "./app.js"
import { db } from "./infrastructure/database/index.js"
import { logger } from "./shared/logger/logger.js"
import { sql } from "drizzle-orm"

async function main() {

  try {
    //await db.execute(sql`SELECT 1`)
    logger.info("Database connected ✅")
  } catch (error) {
    logger.error({ error }, "Database connection failed")
    process.exit(1)
  }

  // ─── 2. Create Express App ───────────────────────
  const app = createApp()

  // ─── 3. Start Server ─────────────────────────────
  const server = app.listen(env.PORT, () => {
    logger.info(
      {
        port: env.PORT,
        environment: env.ENVIRONMENT,
      },
      "Server started ✅"
    )
  })

  // ─── 4. Graceful Shutdown ─────────────────────────
  async function shutdown(signal: string) {
    logger.info({ signal }, "Shutdown signal received")

    // Stop accepting new requests
    server.close(async () => {
      logger.info("Server closed")

      // Close DB connection
      // For drizzle with pg pool
      // You need to close the pool
      logger.info("Shutdown complete ✅")
      process.exit(0)
    })

    // Force exit if graceful shutdown takes too long
    setTimeout(() => {
      logger.error("Forced shutdown after timeout")
      process.exit(1)
    }, 10_000) // 10 seconds
  }

  process.on("SIGTERM", () => shutdown("SIGTERM"))
  process.on("SIGINT", () => shutdown("SIGINT"))

  // ─── 5. Handle Unexpected Errors ─────────────────
  process.on("unhandledRejection", (reason) => {
    logger.error({ reason }, "Unhandled rejection")
  })

  process.on("uncaughtException", (error) => {
    logger.error({ error }, "Uncaught exception")
    process.exit(1)
  })
}

// Start
main().catch((error) => {
  console.error("Failed to start server:", error)
  process.exit(1)
})
