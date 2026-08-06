import pg from "pg";

const pool = new pg.Pool({
  connectionString:
    "postgresql://postgres:postgres@localhost:51214/whangarei_yacht_support?sslmode=disable",
});

const tables = await pool.query(
  "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename"
);
console.log("Tables:", tables.rows.map((r) => r.tablename).join(", "));
await pool.end();
