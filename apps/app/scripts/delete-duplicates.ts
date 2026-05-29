import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const slugsToDelete = ["web-dev", "backend-dev", "mobile-dev"];

  for (const slug of slugsToDelete) {
    const cat = await prisma.category.findUnique({ where: { slug } });
    if (cat) {
      await prisma.category.delete({ where: { id: cat.id } });
      console.log(`Deleted ${slug} (${cat.id})`);
    } else {
      console.log(`Not found: ${slug}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
