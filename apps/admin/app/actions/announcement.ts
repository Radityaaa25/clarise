"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { checkAdmin } from "@/lib/auth-guard";

/**
 * Buat pengumuman baru sekaligus broadcast ke notifikasi user.
 *
 * Setelah Announcement record dibuat, kita fan-out ke tabel Notification
 * berdasarkan target audience:
 * - "ALL"     → semua user
 * - "FREE"    → user dengan plan FREE / tanpa subscription
 * - "PREMIUM" → user dengan plan PREMIUM/PREMIUM_YEARLY/PREMIUM_TRIAL aktif
 *
 * Dilakukan dalam batch (createMany) supaya cepat untuk basis user besar.
 * Kalau gagal saat fan-out, Announcement tetap tercatat — admin bisa
 * trigger ulang manual lewat tombol re-broadcast nanti.
 */
export async function createAnnouncement(data: {
  title: string;
  target: string;
  body: string;
}) {
  const guard = await checkAdmin();
  if (!guard.ok) {
    return {
      success: false,
      error:
        guard.error === "UNAUTHORIZED"
          ? "Tidak terautentikasi"
          : "Akses ditolak",
    };
  }

  try {
    // 1. Simpan Announcement record (sumber kebenaran admin)
    const announcement = await prisma.announcement.create({
      data: {
        title: data.title,
        target: data.target,
        body: data.body,
        isActive: true,
        startAt: new Date(),
      },
    });

    // 2. Tentukan filter user berdasarkan target audience
    const userWhere: Prisma.UserWhereInput = (() => {
      if (data.target === "PREMIUM") {
        return {
          subscription: {
            status: "ACTIVE",
            plan: { in: ["PREMIUM", "PREMIUM_YEARLY", "PREMIUM_TRIAL"] },
          },
        };
      }
      if (data.target === "FREE") {
        return {
          OR: [
            { subscription: null },
            { subscription: { plan: "FREE" } },
          ],
        };
      }
      // "ALL" atau lainnya → semua user
      return {};
    })();

    // 3. Ambil userId yang match (cuma id, hemat memory)
    const targetUsers = await prisma.user.findMany({
      where: userWhere,
      select: { id: true },
    });

    if (targetUsers.length > 0) {
      // 4. Fan-out: bikin Notification per user dalam satu createMany
      await prisma.notification.createMany({
        data: targetUsers.map((u) => ({
          userId: u.id,
          type: "ANNOUNCEMENT",
          title: data.title,
          body: data.body,
        })),
      });
    }

    revalidatePath("/announcements");
    return {
      success: true,
      recipientCount: targetUsers.length,
      announcementId: announcement.id,
    };
  } catch (error) {
    console.error("Error createAnnouncement:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Gagal membuat pengumuman",
    };
  }
}

export async function deleteAnnouncement(id: string) {
  const guard = await checkAdmin();
  if (!guard.ok) {
    return {
      success: false,
      error:
        guard.error === "UNAUTHORIZED"
          ? "Tidak terautentikasi"
          : "Akses ditolak",
    };
  }

  try {
    await prisma.announcement.delete({
      where: { id },
    });

    revalidatePath("/announcements");
    return { success: true };
  } catch (error) {
    console.error("Error deleteAnnouncement:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Gagal menghapus pengumuman",
    };
  }
}
