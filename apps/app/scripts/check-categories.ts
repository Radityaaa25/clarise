import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { courses: true },
      },
    },
  });

  console.log("Categories in DB:");
  categories.forEach((c) => {
    console.log(
      `- [${c.id}] ${c.name} (${c.slug}) -> ${c._count.courses} courses`,
    );
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
