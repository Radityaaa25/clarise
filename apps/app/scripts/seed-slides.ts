import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Mencari modul yang belum memiliki slide kuis dan challenge...");

  const modules = await prisma.module.findMany({
    include: {
      slides: true,
    },
  });

  let kuisAdded = 0;
  let challengeAdded = 0;

  for (const mod of modules) {
    const hasQuiz = mod.slides.some((s) => {
      const content = s.content as any;
      return content?.type === "quiz";
    });

    const hasChallenge = mod.slides.some((s) => {
      const content = s.content as any;
      return content?.type === "challenge";
    });

    // Menentukan order untuk slide baru
    const maxOrder =
      mod.slides.length > 0 ? Math.max(...mod.slides.map((s) => s.order)) : 0;

    let currentOrder = maxOrder + 1;

    if (!hasQuiz) {
      await prisma.slide.create({
        data: {
          title: "Validasi Pemahaman",
          moduleId: mod.id,
          order: currentOrder++,
          content: {
            type: "quiz",
          },
        },
      });
      kuisAdded++;
    }

    if (!hasChallenge) {
      await prisma.slide.create({
        data: {
          title: "Tantangan Praktek",
          moduleId: mod.id,
          order: currentOrder++,
          content: {
            type: "challenge",
          },
        },
      });
      challengeAdded++;
    }
  }

  console.log(
    `✅ Berhasil menambahkan ${kuisAdded} slide Kuis dan ${challengeAdded} slide Challenge.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
