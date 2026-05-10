import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/infrastructure/database/schemas/index.ts", // Path to your schema file
  out: "./src/infrastructure/database/migrations/",            // Where migration files will be saved
  dialect: "postgresql",       // We are using Postgres (Neon)
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Your Neon connection string
  },
});
