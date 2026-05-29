"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkAdmin } from "@/lib/auth-guard";

export async function createAnnouncement(data: {
  title: string;
  target: string;
  body: string;
}) {
  const guard = await checkAdmin();
  if (!guard.ok) {
    return {
      success: false,
      error: guard.error === "UNAUTHORIZED" ? "Tidak terautentikasi" : "Akses ditolak",
    };
  }

  try {
    await prisma.announcement.create({
      data: {
        title: data.title,
        target: data.target,
        body: data.body,
        isActive: true,
        startAt: new Date(),
      },
    });

    revalidatePath("/announcements");
    return { success: true };
  } catch (error: any) {
    console.error("Error createAnnouncement:", error);
    return {
      success: false,
      error: error.message || "Gagal membuat pengumuman",
    };
  }
}

export async function deleteAnnouncement(id: string) {
  const guard = await checkAdmin();
  if (!guard.ok) {
    return {
      success: false,
      error: guard.error === "UNAUTHORIZED" ? "Tidak terautentikasi" : "Akses ditolak",
    };
  }

  try {
    await prisma.announcement.delete({
      where: { id },
    });

    revalidatePath("/announcements");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleteAnnouncement:", error);
    return {
      success: false,
      error: error.message || "Gagal menghapus pengumuman",
    };
  }
}
