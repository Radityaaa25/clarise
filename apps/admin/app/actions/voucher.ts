"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkAdmin } from "@/lib/auth-guard";

export async function deleteVoucher(voucherId: string) {
  const guard = await checkAdmin();
  if (!guard.ok) {
    return {
      success: false,
      error: guard.error === "UNAUTHORIZED" ? "Tidak terautentikasi" : "Akses ditolak",
    };
  }

  try {
    await prisma.voucher.delete({
      where: { id: voucherId },
    });

    // We don't revalidate path since vouchers use client-side fetch,
    // but it's good practice anyway if it becomes server component.
    revalidatePath("/vouchers");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleteVoucher:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus voucher",
    };
  }
}

export async function deactivateVoucher(voucherId: string) {
  const guard = await checkAdmin();
  if (!guard.ok) {
    return {
      success: false,
      error: guard.error === "UNAUTHORIZED" ? "Tidak terautentikasi" : "Akses ditolak",
    };
  }

  try {
    // Set expiresAt to current time to deactivate it immediately
    await prisma.voucher.update({
      where: { id: voucherId },
      data: { expiresAt: new Date() },
    });

    revalidatePath("/vouchers");
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deactivateVoucher:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menonaktifkan voucher",
    };
  }
}
