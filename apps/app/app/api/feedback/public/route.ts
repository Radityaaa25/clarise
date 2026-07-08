import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAllowedOrigin } from "@/lib/cors";

// Endpoint PUBLIK (tanpa auth) untuk landing page.
// Mengembalikan agregat rating + testimoni terpilih.
// CORS dibatasi ke domain Clarise saja.

function getCorsHeadersPublic(origin: string | null): Record<string, string> {
  const allowed = isAllowedOrigin(origin);
  return {
    "Access-Control-Allow-Origin": allowed && origin ? origin : "",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, { status: 204, headers: getCorsHeadersPublic(origin) });
}

export async function GET(req: Request) {
  const origin = req.headers.get("origin");
  const headers = getCorsHeadersPublic(origin);
  try {
    // Agregat: rata-rata rating + total, hanya yang published.
    const agg = await prisma.appFeedback.aggregate({
      where: { isPublished: true },
      _avg: { rating: true },
      _count: { _all: true },
    });

    // Testimoni: published, rating >= 4, ada pesan, terbaru, maks 9.
    const testimonials = await prisma.appFeedback.findMany({
      where: {
        isPublished: true,
        rating: { gte: 4 },
        message: { not: null },
      },
      orderBy: { createdAt: "desc" },
      take: 9,
      select: {
        id: true,
        rating: true,
        message: true,
        authorName: true,
        authorRole: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        averageRating: agg._avg.rating
          ? Math.round(agg._avg.rating * 10) / 10
          : 0,
        totalRatings: agg._count._all,
        testimonials,
      },
      { headers },
    );
  } catch {
    return NextResponse.json(
      { averageRating: 0, totalRatings: 0, testimonials: [] },
      { status: 200, headers },
    );
  }
}
