import { PrismaClient, Prisma, Difficulty } from "@prisma/client";
import * as fs from "fs";

if (fs.existsSync(".env.local")) {
  const envConfig = fs.readFileSync(".env.local", "utf-8");
  envConfig.split("\n").forEach((line) => {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m && m[1] && m[2])
      process.env[m[1].trim()] = m[2].trim().replace(/^['"](.*)['"]$/, "$1");
  });
}

export const prisma = new PrismaClient();

export type SrcInput = { type: string; title: string; url: string };
export type SlideInput = {
  type: string;
  title: string;
  body: string;
  keyTakeaway?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  challenge?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quizBank?: any[];
  sources?: SrcInput[];
};
export type ModuleInput = {
  title: string;
  slug: string;
  xpReward?: number;
  slides: SlideInput[];
};
export type CourseInput = {
  title: string;
  slug: string;
  description: string;
  categorySlug: string;
  difficulty: Difficulty;
  isPremium: boolean;
  modules: ModuleInput[];
};

// Idempotent: hapus course lama dengan slug sama (cascade) lalu buat ulang.
export async function createCourse(data: CourseInput) {
  const category = await prisma.category.findUnique({
    where: { slug: data.categorySlug },
    select: { id: true },
  });
  if (!category) throw new Error(`Kategori ${data.categorySlug} tidak ada`);

  await prisma.course.deleteMany({ where: { slug: data.slug } });

  const course = await prisma.course.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      categoryId: category.id,
      difficulty: data.difficulty,
      isPremium: data.isPremium,
      isPublished: true,
      visibility: "PUBLIC",
      language: "id",
      totalModules: data.modules.length,
    },
  });

  for (let mi = 0; mi < data.modules.length; mi++) {
    const m = data.modules[mi]!;
    const newModule = await prisma.module.create({
      data: {
        title: m.title,
        slug: m.slug,
        courseId: course.id,
        order: mi + 1,
        xpReward: m.xpReward ?? 50,
      },
    });

    for (let si = 0; si < m.slides.length; si++) {
      const s = m.slides[si]!;
      await prisma.slide.create({
        data: {
          title: s.title,
          moduleId: newModule.id,
          order: si + 1,
          content: {
            type: s.type,
            body: s.body,
            ...(s.keyTakeaway ? { keyTakeaway: s.keyTakeaway } : {}),
            ...(s.challenge ? { challenge: s.challenge } : {}),
            ...(s.quizBank ? { quizBank: s.quizBank } : {}),
          } as unknown as Prisma.InputJsonValue,
          ...(s.sources
            ? {
                sources: {
                  create: s.sources.map((src) => ({
                    type: src.type as Prisma.SourceCreateWithoutSlideInput["type"],
                    title: src.title,
                    url: src.url,
                  })),
                },
              }
            : {}),
        },
      });
    }
  }

  const slideCount = await prisma.slide.count({
    where: { module: { courseId: course.id } },
  });
  console.log(
    `✅ ${data.title} — ${data.modules.length} modul, ${slideCount} slide (${data.isPremium ? "Premium" : "Free"})`,
  );
}
