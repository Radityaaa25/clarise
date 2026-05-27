"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAnnouncement(data: { title: string, target: string, body: string }) {
  try {
    await prisma.announcement.create({
      data: {
        title: data.title,
        target: data.target,
        body: data.body,
        isActive: true,
        startAt: new Date(),
      }
    });
    
    revalidatePath("/announcements");
    return { success: true };
  } catch (error: any) {
    console.error("Error createAnnouncement:", error);
    return { success: false, error: error.message || "Gagal membuat pengumuman" };
  }
}

export async function deleteAnnouncement(id: string) {
  try {
    await prisma.announcement.delete({
      where: { id }
    });
    
    revalidatePath("/announcements");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleteAnnouncement:", error);
    return { success: false, error: error.message || "Gagal menghapus pengumuman" };
  }
}
