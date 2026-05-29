import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCorsHeaders } from "@/lib/cors";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/ratelimit";

// Rate limiter untuk mencegah brute-force enumeration kode voucher.
// Public endpoint (no auth) jadi rentan kalau dibiarkan tanpa limit.
// 20 request per IP per jam — cukup untuk user normal yang hanya cek
// 1-2 kode, tapi nge-block scraper yang nyobain ribuan kombinasi.
const voucherCheckRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "1 h"),
  prefix: "clarise:voucher:check",
  analytics: true,
});

// Public endpoint — tidak perlu auth
// Hanya mengembalikan status valid/tidak, tanpa data sensitif
export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Identifikasi pemanggil berdasarkan IP. Di balik proxy/CDN (Vercel),
  // x-forwarded-for berisi chain IP — ambil yang pertama (IP asli klien).
  const forwardedFor = req.headers.get("x-forwarded-for") ?? "";
  const realIp = req.headers.get("x-real-ip") ?? "";
  const ip = forwardedFor.split(",")[0]?.trim() || realIp || "anonymous";

  const { success, remaining, reset } = await voucherCheckRatelimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      {
        isValid: false,
        error: "Terlalu banyak permintaan. Coba lagi nanti.",
      },
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": reset.toString(),
        },
      },
    );
  }

  try {
    const resolvedParams = await params;
    const { code } = resolvedParams;

    if (!code || code.trim().length < 3) {
      return NextResponse.json(
        { isValid: false, error: "Kode voucher tidak valid" },
        { status: 400, headers: corsHeaders },
      );
    }

    // Batasi panjang kode untuk mencegah query timing attacks dengan input panjang
    if (code.length > 50) {
      return NextResponse.json(
        { isValid: false, error: "Kode voucher tidak valid" },
        { status: 400, headers: corsHeaders },
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
        {
          status: 404,
          headers: {
            ...corsHeaders,
            "X-RateLimit-Remaining": remaining.toString(),
          },
        },
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
        reason: isExpired
          ? "Kode sudah kedaluwarsa"
          : isFull
            ? "Kuota kode sudah habis"
            : null,
      },
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "X-RateLimit-Remaining": remaining.toString(),
        },
      },
    );
  } catch (error) {
    console.error("[VOUCHER_CHECK_PUBLIC]", error);
    return NextResponse.json(
      { isValid: false, error: "Terjadi kesalahan" },
      { status: 500, headers: corsHeaders },
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
