// import "dotenv/config";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { env } from "./env";

// export const db = drizzle(env.DATABASE_URL);
// export * from "drizzle-orm";
// export default db;


import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "./env";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(pool);

export * from "drizzle-orm";
export default db;
