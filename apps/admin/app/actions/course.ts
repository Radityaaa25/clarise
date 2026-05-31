"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkAdmin } from "@/lib/auth-guard";

export async function deleteCourse(courseId: string) {
  const guard = await checkAdmin();
  if (!guard.ok) {
    return {
      success: false,
      error: guard.error === "UNAUTHORIZED" ? "Tidak terautentikasi" : "Akses ditolak",
    };
  }

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return { success: false, error: "Course tidak ditemukan" };
    }

    // Karena relasi Cascade, modul dan progress akan terhapus otomatis
    await prisma.course.delete({
      where: { id: courseId },
    });

    revalidatePath("/courses");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleteCourse:", error);
    return { success: false, error: error instanceof Error ? error.message : "Gagal menghapus kursus" };
  }
}

export async function toggleCoursePublish(
  courseId: string,
  isPublished: boolean,
) {
  const guard = await checkAdmin();
  if (!guard.ok) {
    return {
      success: false,
      error: guard.error === "UNAUTHORIZED" ? "Tidak terautentikasi" : "Akses ditolak",
    };
  }

  try {
    await prisma.course.update({
      where: { id: courseId },
      data: { isPublished },
    });

    revalidatePath("/courses");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error toggleCoursePublish:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal memperbarui status kursus",
    };
  }
}
