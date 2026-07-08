import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  // Cek apakah request memiliki auth header untuk detail
  const authHeader = req.headers.get("authorization");
  const isAuthorized = authHeader === `Bearer ${process.env.CRON_SECRET}`;

  try {
    // Jalankan query ringan ke database untuk mencegah Supabase "tertidur"
    await prisma.$queryRaw`SELECT 1`;

    // Hanya kembalikan detail jika authorized (cron/admin)
    if (isAuthorized) {
      return NextResponse.json({
        status: "healthy",
        message: "Clarise is up and running!",
        timestamp: new Date().toISOString(),
      });
    }

    // Respons publik — minimal, tanpa info internal
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Health check failed:", error);

    if (isAuthorized) {
      return NextResponse.json(
        { status: "unhealthy", message: "Database connection failed" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { status: "error" },
      { status: 500 },
    );
  }
}
