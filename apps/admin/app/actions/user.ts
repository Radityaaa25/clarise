"use server";

import { prisma } from "@/lib/prisma";
import { createClerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { checkAdmin } from "@/lib/auth-guard";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

export async function deleteUser(userId: string) {
  const guard = await checkAdmin();
  if (!guard.ok) {
    return {
      success: false,
      error: guard.error === "UNAUTHORIZED" ? "Tidak terautentikasi" : "Akses ditolak",
    };
  }

  try {
    // Cari user di database kita untuk mendapatkan clerkId
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { clerkId: true },
    });

    if (!user) {
      return { success: false, error: "User tidak ditemukan" };
    }

    // 1. Hapus dari Prisma Database (Otomatis hapus progress dll karena onDelete: Cascade)
    await prisma.user.delete({
      where: { id: userId },
    });

    // 2. Hapus dari Clerk Auth
    if (user.clerkId) {
      try {
        await clerkClient.users.deleteUser(user.clerkId);
      } catch (clerkErr: unknown) {
        console.error("Gagal menghapus user dari Clerk:", clerkErr);
        // Kita tidak mereturn error jika Clerk gagal (mungkin user sudah dihapus manual di Clerk)
        // tapi log tetap dicetak.
      }
    }

    revalidatePath("/users");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleteUser:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus pengguna",
    };
  }
}

export async function updateUserTier(userId: string, tier: "FREE" | "PREMIUM" | "PREMIUM_TRIAL") {
  const guard = await checkAdmin();
  if (!guard.ok) {
    return {
      success: false,
      error: guard.error === "UNAUTHORIZED" ? "Tidak terautentikasi" : "Akses ditolak",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { clerkId: true },
    });

    if (!user) {
      return { success: false, error: "User tidak ditemukan" };
    }

    if (tier === "FREE") {
      // Hapus subscription jika ada
      await prisma.subscription.deleteMany({
        where: { userId },
      });
      
      // Update role
      await prisma.user.update({
        where: { id: userId },
        data: { role: "USER" },
      });

      if (user.clerkId) {
        await clerkClient.users.updateUserMetadata(user.clerkId, {
          publicMetadata: {
            role: "user",
          },
        });
      }
    } else if (tier === "PREMIUM" || tier === "PREMIUM_TRIAL") {
      // Buat atau update subscription (misal kasih 1 bulan gratis, atau statis setahun)
      const now = new Date();
      const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
      
      const now2 = new Date();
      const trialEnd = new Date(now2.setDate(now2.getDate() + 7)); // 7 days trial

      // Harus di-delete dulu kalau unique constraint tidak ada di userId
      // Tapi karena subscription user 1-1, ini aman.
      // Wait, relation di schema: `subscription Subscription?` -> 1 to 1.
      // Upsert membutuhkan unique field `userId`.

      // Workaround: prisma.subscription.findUnique lalu update/create
      const existingSub = await prisma.subscription.findFirst({
        where: { userId }
      });

      if (existingSub) {
        await prisma.subscription.update({
          where: { id: existingSub.id },
          data: {
            plan: tier,
            status: "ACTIVE",
            endDate: tier === "PREMIUM_TRIAL" ? trialEnd : nextMonth,
          }
        });
      } else {
        await prisma.subscription.create({
          data: {
            userId,
            plan: tier,
            status: "ACTIVE",
            startDate: new Date(),
            endDate: tier === "PREMIUM_TRIAL" ? trialEnd : nextMonth,
          }
        });
      }

      // Update role removed since PREMIUM is not a role in Prisma, only USER and ADMIN are roles.
      // We don't touch role here because they remain USER, just their subscription becomes PREMIUM.
      
      if (user.clerkId) {
        await clerkClient.users.updateUserMetadata(user.clerkId, {
          publicMetadata: {
            role: "premium",
          },
        });
      }
    }

    revalidatePath("/users");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error updateUserTier:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengubah tier pengguna",
    };
  }
}
