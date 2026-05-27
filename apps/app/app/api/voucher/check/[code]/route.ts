import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCorsHeaders } from "@/lib/cors";

// Public endpoint — tidak perlu auth
// Hanya mengembalikan status valid/tidak, tanpa data sensitif
export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  try {
    const resolvedParams = await params;
    const { code } = resolvedParams;

    if (!code || code.trim().length < 3) {
      return NextResponse.json(
        { isValid: false, error: "Kode voucher tidak valid" },
        { status: 400, headers: corsHeaders }
      );
    }

    const voucher = await prisma.voucher.findUnique({
      where: { code: code.toUpperCase().trim() },
      select: {
        expiresAt: true,
        maxUses: true,
        usedCount: true,
        trialDays: true,
        type: true,
      },
    });

    if (!voucher) {
      return NextResponse.json(
        { isValid: false, error: "Kode voucher tidak ditemukan" },
        { status: 404, headers: corsHeaders }
      );
    }

    const isExpired = new Date(voucher.expiresAt) < new Date();
    const isFull = voucher.usedCount >= voucher.maxUses;
    const remainingSlots = Math.max(0, voucher.maxUses - voucher.usedCount);

    return NextResponse.json(
      {
        isValid: !isExpired && !isFull,
        trialDays: voucher.trialDays,
        remainingSlots,
        reason: isExpired ? "Kode sudah kedaluwarsa" : isFull ? "Kuota kode sudah habis" : null,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("[VOUCHER_CHECK_PUBLIC]", error);
    return NextResponse.json(
      { isValid: false, error: "Terjadi kesalahan" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle CORS preflight
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}
