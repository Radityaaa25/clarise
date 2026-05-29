import { prisma } from "@/lib/prisma";
import { corsResponse } from "@/lib/cors";
import { z } from "zod";
import { checkApiAdmin } from "@/lib/admin-auth";

const createVoucherSchema = z.object({
  code: z.string().min(3).max(30).trim().toUpperCase(),
  type: z.enum(["TRIAL", "DISCOUNT"]),
  trialDays: z.number().min(0).default(0),
  discountPct: z.number().min(0).max(100).default(0),
  maxUses: z.number().min(1),
  expiresAt: z.string().datetime(),
});

export async function GET(req: Request) {
  const origin = req.headers.get("origin");
  try {
    const guard = await checkApiAdmin();
    if (!guard.ok) {
      const status = guard.error === "UNAUTHORIZED" ? 401 : 403;
      const message =
        guard.error === "UNAUTHORIZED"
          ? "Unauthorized"
          : "Forbidden: Admin access required";
      return corsResponse({ error: message }, status, origin);
    }

    const vouchers = await prisma.voucher.findMany({
      orderBy: { createdAt: "desc" },
    });

    return corsResponse({ vouchers }, 200, origin);
  } catch (error) {
    console.error("[ADMIN_VOUCHERS_GET]", error);
    return corsResponse({ error: "Internal Error" }, 500, origin);
  }
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  try {
    const guard = await checkApiAdmin();
    if (!guard.ok) {
      const status = guard.error === "UNAUTHORIZED" ? 401 : 403;
      const message =
        guard.error === "UNAUTHORIZED"
          ? "Unauthorized"
          : "Forbidden: Admin access required";
      return corsResponse({ error: message }, status, origin);
    }

    const body = await req.json();
    const parsed = createVoucherSchema.safeParse(body);

    if (!parsed.success) {
      return corsResponse(
        { error: "Invalid data", details: parsed.error.format() },
        400,
        origin,
      );
    }

    const { code, type, trialDays, discountPct, maxUses, expiresAt } =
      parsed.data;

    const existing = await prisma.voucher.findUnique({
      where: { code },
    });

    if (existing) {
      return corsResponse(
        { error: "Voucher code already exists" },
        400,
        origin,
      );
    }

    const voucher = await prisma.voucher.create({
      data: {
        code,
        type,
        trialDays: type === "TRIAL" ? trialDays : 0,
        discountPct: type === "DISCOUNT" ? discountPct : 0,
        maxUses,
        expiresAt: new Date(expiresAt),
      },
    });

    return corsResponse({ voucher }, 200, origin);
  } catch (error) {
    console.error("[ADMIN_VOUCHERS_POST]", error);
    return corsResponse({ error: "Internal Error" }, 500, origin);
  }
}
