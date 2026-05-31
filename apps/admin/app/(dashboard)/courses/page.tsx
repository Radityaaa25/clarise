import { prisma } from "@/lib/prisma";
import { CoursesClient } from "./client";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      isAiGenerated: true,
      isPublished: true,
      author: {
        select: { name: true },
      },
    },
  });

  const formattedCourses = courses.map((course: (typeof courses)[number]) => ({
    id: course.id,
    title: course.title,
    slug: course.slug,
    isAiGenerated: course.isAiGenerated,
    isPublished: course.isPublished,
    authorName: course.author?.name ?? null,
  }));

  return <CoursesClient initialCourses={formattedCourses} />;
}
