"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ReportStatus } from "@prisma/client";
import { checkAdmin } from "@/lib/auth-guard";

export async function updateReportStatus(
  reportId: string,
  status: ReportStatus,
) {
  const guard = await checkAdmin();
  if (!guard.ok) {
    return {
      success: false,
      error: guard.error === "UNAUTHORIZED" ? "Tidak terautentikasi" : "Akses ditolak",
    };
  }

  try {
    const report = await prisma.report.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      return { success: false, error: "Report tidak ditemukan" };
    }

    await prisma.report.update({
      where: { id: reportId },
      data: { status },
    });

    // Jika RESOLVED, kita juga bisa set course menjadi unpublished
    if (status === "RESOLVED") {
      await prisma.course.update({
        where: { id: report.courseId },
        data: { isPublished: false },
      });
    }

    revalidatePath("/reports");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error updateReportStatus:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal memperbarui status laporan",
    };
  }
}
