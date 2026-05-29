import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { checkApiAdmin } from "@/lib/admin-auth";

const updateSchema = z
  .object({
    maxUses: z.number().min(1).optional(),
    expiresAt: z.string().datetime().optional(),
    // In a real app we might have isActive boolean, but we can manage expiry
  })
  .strict();

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const guard = await checkApiAdmin();
  if (!guard.ok) {
    const status = guard.error === "UNAUTHORIZED" ? 401 : 403;
    const message =
      guard.error === "UNAUTHORIZED" ? "Unauthorized" : "Forbidden";
    return NextResponse.json({ error: message }, { status });
  }

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const existing = await prisma.voucher.findUnique({ where: { id } });
  if (!existing)
    return NextResponse.json({ error: "Voucher not found" }, { status: 404 });

  const updateData: Record<string, unknown> = {};
  if (parsed.data.maxUses !== undefined)
    updateData.maxUses = parsed.data.maxUses;
  if (parsed.data.expiresAt !== undefined)
    updateData.expiresAt = new Date(parsed.data.expiresAt);

  const voucher = await prisma.voucher.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json({ voucher });
}
