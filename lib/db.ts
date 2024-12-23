import { Pool } from "pg";

let pool: Pool | null = null;

if (process.env.NODE_ENV !== "production") {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

export default pool;
