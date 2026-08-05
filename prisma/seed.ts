import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          name: "James Harrington",
          yachtName: "MV Serenity",
          country: "United Kingdom",
          rating: 5,
          content:
            "Whangarei Yacht Support provided exceptional guardianage while we travelled inland.",
          sortOrder: 1,
        },
        {
          name: "Sophie Laurent",
          yachtName: "La Belle Étoile",
          country: "France",
          rating: 5,
          content: "Our refit project was managed flawlessly from start to finish.",
          sortOrder: 2,
        },
      ],
    });
  }

  console.log("Seed complete:");
  console.log(`  Testimonials seeded`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
