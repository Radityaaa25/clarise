"use server";

import { prisma } from "@/lib/prisma";
import { createClerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

export async function deleteUser(userId: string) {
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
      } catch (clerkErr: any) {
        console.error("Gagal menghapus user dari Clerk:", clerkErr);
        // Kita tidak mereturn error jika Clerk gagal (mungkin user sudah dihapus manual di Clerk)
        // tapi log tetap dicetak.
      }
    }

    revalidatePath("/users");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleteUser:", error);
    return { success: false, error: error.message || "Gagal menghapus pengguna" };
  }
}
