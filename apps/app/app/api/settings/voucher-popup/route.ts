import { NextResponse } from "next/server";
import { redis } from "@/lib/ratelimit";
import { getCorsHeaders } from "@/lib/cors";

const VOUCHER_POPUP_KEY = "clarise:feature:voucher_popup";

// Public endpoint — tidak perlu auth
// Dicek oleh landing page untuk menentukan apakah popup voucher ditampilkan
export async function GET(req: Request) {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  try {
    const enabled = await redis.get<string>(VOUCHER_POPUP_KEY);
    return NextResponse.json(
      { enabled: enabled === "true" },
      { headers: corsHeaders }
    );
  } catch {
    // Default: enabled (aman jika Redis down)
    return NextResponse.json(
      { enabled: true },
      { headers: corsHeaders }
    );
  }
}

// Handle CORS preflight
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new Response(null, { status: 204, headers: getCorsHeaders(origin) });
}
