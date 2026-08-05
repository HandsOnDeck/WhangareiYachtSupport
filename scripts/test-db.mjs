import pg from "pg";

const pool = new pg.Pool({
  connectionString:
    "postgresql://postgres:postgres@localhost:51214/whangarei_yacht_support?sslmode=disable",
});

try {
  const result = await pool.query('SELECT COUNT(*)::int AS count FROM "User"');
  console.log("Connected. Users:", result.rows[0].count);
} catch (error) {
  console.error("Connection failed:", error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  await pool.end();
}
