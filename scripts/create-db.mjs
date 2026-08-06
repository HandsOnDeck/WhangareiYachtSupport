import pg from "pg";

const { Pool } = pg;

async function main() {
  const pool = new Pool({
    connectionString:
      "postgresql://postgres:postgres@localhost:51214/postgres?sslmode=disable",
  });

  const existing = await pool.query(
    "SELECT 1 FROM pg_database WHERE datname = $1",
    ["whangarei_yacht_support"]
  );

  if (existing.rows.length > 0) {
    console.log("Database already exists");
  } else {
    await pool.query("CREATE DATABASE whangarei_yacht_support");
    console.log("Database created");
  }

  await pool.end();
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
