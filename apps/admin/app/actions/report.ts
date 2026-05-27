"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ReportStatus } from "@prisma/client";

export async function updateReportStatus(reportId: string, status: ReportStatus) {
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
  } catch (error: any) {
    console.error("Error updateReportStatus:", error);
    return { success: false, error: error.message || "Gagal memperbarui status laporan" };
  }
}
