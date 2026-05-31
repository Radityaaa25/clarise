import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Endpoint PUBLIK (tanpa auth) untuk landing page.
// Mengembalikan agregat rating + testimoni terpilih.
// CORS diaktifkan karena landing (clarise.my.id) beda origin dengan
// app (app.clarise.my.id).

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
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
      { headers: CORS_HEADERS },
    );
  } catch {
    return NextResponse.json(
      { averageRating: 0, totalRatings: 0, testimonials: [] },
      { status: 200, headers: CORS_HEADERS },
    );
  }
}
