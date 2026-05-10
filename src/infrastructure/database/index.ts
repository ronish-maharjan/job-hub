import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schemas/index.js";
import { env } from "../../shared/configs/env.js";

// 1. Create the connection pool
const pool = new Pool({
  connectionString:env.DATABASE_URL,
  max: 10, // Set maximum number of connections in the pool
});

// 2. Initialize Drizzle with the pool and your schema
export const db = drizzle(pool, { schema });
