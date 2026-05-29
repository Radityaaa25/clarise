import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

// Initialize Resend
// Note: Requires RESEND_API_KEY in environment variables
const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key");

export async function GET(req: Request) {
  try {
    // Basic authorization for cron job (optional but recommended)
    // E.g., checking Authorization header against a CRON_SECRET
    const authHeader = req.headers.get("Authorization");
    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Determine current hour in UTC+7 (WIB) since our target market is Indonesia
    // Server time is usually UTC.
    const nowUtc = new Date();
    // Convert to UTC+7
    const currentWibTime = new Date(nowUtc.getTime() + 7 * 60 * 60 * 1000);
    const currentHourStr = currentWibTime.toISOString().substring(11, 13); // "HH"

    // Find users with daily reminders enabled matching the current hour
    // E.g., preferredTime like "08:00" -> hour is "08"
    const reminders = await prisma.dailyReminder.findMany({
      where: {
        enabled: true,
        preferredTime: { startsWith: currentHourStr },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            currentStreak: true,
            lastActiveDate: true,
            progress: {
              where: { completedAt: null },
              include: { course: true, module: true },
              take: 1,
            },
          },
        },
      },
    });

    const emailsToSend = [];
    const todayWibStart = new Date(currentWibTime);
    todayWibStart.setUTCHours(0, 0, 0, 0);

    for (const reminder of reminders) {
      const user = reminder.user;
      if (!user.email) continue;

      // Skip if user was active today
      if (user.lastActiveDate) {
        const lastActiveWib = new Date(
          user.lastActiveDate.getTime() + 7 * 60 * 60 * 1000,
        );
        if (lastActiveWib >= todayWibStart) {
          continue; // Already active today, no need to remind
        }
      }

      const activeCourse = user.progress[0]?.course?.title || "Materi Clarise";
      const userName = user.name || "Sobat Clarise";

      emailsToSend.push({
        from: "Clarise <noreply@clarise.com>", // Ganti dengan domain yang diverifikasi di Resend
        to: user.email,
        subject: `Hai ${userName}, streak kamu ${user.currentStreak} hari! 🔥`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #1A7FCC;">Waktunya Belajar! 🚀</h2>
            <p>Halo <b>${userName}</b>,</p>
            <p>Jangan putus streak belajarmu hari ini! Kamu sudah memiliki streak <b>${user.currentStreak} hari</b>.</p>
            <p>Lanjutkan belajar kursus <b>${activeCourse}</b> sekarang dan raih XP tambahan!</p>
            <br/>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://app.clarise.com"}/dashboard" 
               style="background-color: #1A7FCC; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Lanjut Belajar
            </a>
            <p style="margin-top: 30px; font-size: 12px; color: #888;">
              Kamu menerima email ini karena mengaktifkan pengingat harian. 
              Ubah pengaturan di profilmu jika tidak ingin menerima notifikasi.
            </p>
          </div>
        `,
      });
    }

    if (emailsToSend.length > 0 && process.env.RESEND_API_KEY) {
      // Send emails in batch (Resend supports max 100 per batch)
      // For simplicity, we just loop (or use batch API if available)
      const batchSize = 100;
      for (let i = 0; i < emailsToSend.length; i += batchSize) {
        const batch = emailsToSend.slice(i, i + batchSize);
        await resend.batch.send(batch);
      }
    }

    return NextResponse.json({
      success: true,
      processed: reminders.length,
      sent: emailsToSend.length,
    });
  } catch (error: any) {
    console.error("[CRON_DAILY_REMINDER]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
