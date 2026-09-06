/**
 * One-off: rename JOBTYPE GAURDIAN → GUARDIAN and re-point JOB rows.
 * Run: npx tsx prisma/rename-guardian-jobtype.ts
 */
import { config } from "dotenv";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

config({ path: ".env.local" });
config({ path: ".env" });

async function main() {
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL / DIRECT_URL not set");
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  try {
    await prisma.jobType.upsert({
      where: { jobType: "GUARDIAN" },
      create: { jobType: "GUARDIAN", descr: "Guardianage" },
      update: { descr: "Guardianage" },
    });

    const updated = await prisma.job.updateMany({
      where: { jobType: "GAURDIAN" },
      data: { jobType: "GUARDIAN" },
    });

    const legacy = await prisma.jobType.findUnique({ where: { jobType: "GAURDIAN" } });
    if (legacy) {
      await prisma.jobType.delete({ where: { jobType: "GAURDIAN" } });
    }

    // Ensure other lookup rows exist
    for (const row of [
      { jobType: "ACCOM", descr: "Accommodation" },
      { jobType: "PROJECT", descr: "Project Work" },
      { jobType: "OTHER", descr: "Other" },
    ]) {
      await prisma.jobType.upsert({
        where: { jobType: row.jobType },
        create: row,
        update: { descr: row.descr },
      });
    }

    console.log(
      `Done. Jobs re-pointed from GAURDIAN: ${updated.count}. JOBTYPE rows: ${await prisma.jobType.count()}`
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
