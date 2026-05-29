"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteVoucher(voucherId: string) {
  try {
    await prisma.voucher.delete({
      where: { id: voucherId },
    });

    // We don't revalidate path since vouchers use client-side fetch,
    // but it's good practice anyway if it becomes server component.
    revalidatePath("/vouchers");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleteVoucher:", error);
    return {
      success: false,
      error: error.message || "Gagal menghapus voucher",
    };
  }
}

export async function deactivateVoucher(voucherId: string) {
  try {
    // Set expiresAt to current time to deactivate it immediately
    await prisma.voucher.update({
      where: { id: voucherId },
      data: { expiresAt: new Date() },
    });

    revalidatePath("/vouchers");
    return { success: true };
  } catch (error: any) {
    console.error("Error deactivateVoucher:", error);
    return {
      success: false,
      error: error.message || "Gagal menonaktifkan voucher",
    };
  }
}
