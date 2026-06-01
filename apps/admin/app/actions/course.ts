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



// Setujui permintaan publikasi: course PRIVATE milik user → PUBLIC & published.
export async function approveCoursePublic(courseId: string) {
  const guard = await checkAdmin();
  if (!guard.ok) {
    return {
      success: false,
      error: guard.error === "UNAUTHORIZED" ? "Tidak terautentikasi" : "Akses ditolak",
    };
  }

  try {
    const course = await prisma.course.update({
      where: { id: courseId },
      data: { visibility: "PUBLIC", isPublished: true, publishStatus: "APPROVED" },
      select: { title: true, authorId: true },
    });
    if (course.authorId) {
      await prisma.notification.create({
        data: {
          userId: course.authorId,
          type: "ANNOUNCEMENT",
          title: "Kursus disetujui untuk publik",
          body: `Selamat! Kursus "${course.title}" telah disetujui admin dan kini bisa dilihat semua orang.`,
        },
      });
    }
    revalidatePath("/courses");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error approveCoursePublic:", error);
    return { success: false, error: error instanceof Error ? error.message : "Gagal menyetujui kursus" };
  }
}

// Tolak permintaan publikasi: course tetap PRIVATE.
export async function rejectCoursePublic(courseId: string) {
  const guard = await checkAdmin();
  if (!guard.ok) {
    return {
      success: false,
      error: guard.error === "UNAUTHORIZED" ? "Tidak terautentikasi" : "Akses ditolak",
    };
  }

  try {
    const course = await prisma.course.update({
      where: { id: courseId },
      data: { publishStatus: "REJECTED" },
      select: { title: true, authorId: true },
    });
    if (course.authorId) {
      await prisma.notification.create({
        data: {
          userId: course.authorId,
          type: "ANNOUNCEMENT",
          title: "Pengajuan publikasi ditolak",
          body: `Maaf, pengajuan publikasi kursus "${course.title}" belum disetujui. Kamu bisa memperbaikinya lalu mengajukan kembali.`,
        },
      });
    }
    revalidatePath("/courses");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error rejectCoursePublic:", error);
    return { success: false, error: error instanceof Error ? error.message : "Gagal menolak kursus" };
  }
}
