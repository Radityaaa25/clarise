import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Jalankan query ringan ke database untuk mencegah Supabase "tertidur"
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: "healthy",
      message: "Clarise is up and running!",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      { status: "unhealthy", message: "Database connection failed" },
      { status: 500 },
    );
  }
}
