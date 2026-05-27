import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const reminderSchema = z.object({
  enabled: z.boolean(),
  preferredTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format jam tidak valid (HH:MM)"),
  channel: z.enum(["EMAIL"]).default("EMAIL"),
}).strict();

export async function GET(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: { dailyReminder: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: user.dailyReminder || {
        enabled: false,
        preferredTime: "08:00",
        channel: "EMAIL"
      }
    });
  } catch (error) {
    console.error("[USER_REMINDER_GET]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const parsed = reminderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error }, { status: 400 });
    }

    const { enabled, preferredTime, channel } = parsed.data;

    const reminder = await prisma.dailyReminder.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        enabled,
        preferredTime,
        channel,
      },
      update: {
        enabled,
        preferredTime,
        channel,
      },
    });

    return NextResponse.json({ success: true, reminder });
  } catch (error) {
    console.error("[USER_REMINDER_PATCH]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
