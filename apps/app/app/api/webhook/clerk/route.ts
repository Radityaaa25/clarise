import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { bootstrapUser } from "@/lib/user-bootstrap";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("[CLERK_WEBHOOK] Missing CLERK_WEBHOOK_SECRET");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 },
    );
  }

  // Verifikasi svix headers
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 },
    );
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verifikasi signature (svix juga mengecek timestamp untuk replay protection)
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("[CLERK_WEBHOOK] Verification failed:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 400 });
  }

  const eventType = evt.type;

  try {
    if (eventType === "user.created" || eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url } =
        evt.data;

      const primaryEmail = email_addresses?.[0]?.email_address;
      if (!primaryEmail) {
        return NextResponse.json({ error: "No email found" }, { status: 400 });
      }

      const name = [first_name, last_name].filter(Boolean).join(" ") || null;

      // Bootstrap user — idempotent, aman dipanggil berulang kali oleh
      // webhook retry. Welcome notif hanya dibuat kalau user benar-benar
      // baru di database (isNewUser=true di dalam bootstrap).
      await bootstrapUser({
        clerkId: id,
        email: primaryEmail,
        name,
        imageUrl: image_url || null,
      });
    } else if (eventType === "user.deleted") {
      const { id } = evt.data;
      if (id) {
        // deleteMany tidak error kalau user tidak ditemukan (idempotent)
        await prisma.user.deleteMany({
          where: { clerkId: id },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    // Catch-all error handling. Return 500 supaya Clerk retry — tapi pastikan
    // semua operasi DB di atas sudah idempotent agar retry tidak menimbulkan
    // duplikat data.
    console.error(
      `[CLERK_WEBHOOK] Failed to process event ${eventType}:`,
      err,
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
