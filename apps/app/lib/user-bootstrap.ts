import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const WELCOME_NOTIFICATION_TITLE = "Selamat datang di Clarise! 🎉";
const WELCOME_NOTIFICATION_BODY =
  "Sebagai pengguna baru, Anda berhak mengklaim 2 kursus GRATIS (maks. 1 Kursus Premium). Kunjungi halaman Explore untuk memilih materi Anda!";

/**
 * Generate kode referral 8 karakter alphanumeric uppercase.
 */
function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

/**
 * Pastikan user baru dapat welcome notification — TRULY idempotent
 * dengan atomic database-level claim.
 *
 * Pakai `updateMany` dengan WHERE `welcomeNotifSent = false` sebagai
 * gate atomic. Hanya satu caller yang akan dapat `count = 1` (winning
 * the race), sisanya dapat `count = 0` dan exit early.
 *
 * Ini menghindari race condition dimana webhook Clerk dan endpoint
 * `/api/user` dipanggil bersamaan saat user signup — sebelumnya
 * dua-duanya bisa lolos `findFirst` dan create notif duplikat.
 *
 * Kalau create notification gagal setelah claim, kita TIDAK rollback
 * flag — accept the rare lost notif daripada complicate code dengan
 * 2-phase commit. Error tetap di-log untuk monitoring.
 */
export async function ensureWelcomeNotification(userId: string): Promise<void> {
  // Atomic claim: hanya 1 caller yang berhasil set flag dari false → true
  const claim = await prisma.user.updateMany({
    where: { id: userId, welcomeNotifSent: false },
    data: { welcomeNotifSent: true },
  });

  if (claim.count === 0) return; // Kalah race / sudah pernah dibuat

  try {
    await prisma.notification.create({
      data: {
        userId,
        type: "ANNOUNCEMENT",
        title: WELCOME_NOTIFICATION_TITLE,
        body: WELCOME_NOTIFICATION_BODY,
      },
    });
  } catch (err) {
    // Don't rollback flag — accept rare lost notif. Better than risking
    // duplicate notifs from rollback race.
    console.error(
      "[USER_BOOTSTRAP] Failed to create welcome notification after claim:",
      err,
    );
  }
}

/**
 * Pastikan user punya subscription default FREE (idempotent).
 *
 * Dipanggil saat user di-bootstrap untuk memastikan setiap user di sistem
 * memiliki record subscription. User yang sudah punya subscription
 * (misal PREMIUM) tidak akan di-overwrite.
 */
export async function ensureFreeSubscription(userId: string): Promise<void> {
  try {
    const existing = await prisma.subscription.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (existing) return;

    await prisma.subscription.create({
      data: {
        userId,
        status: "ACTIVE",
        plan: "FREE",
        startDate: new Date(),
      },
    });
  } catch (err) {
    console.error(
      "[USER_BOOTSTRAP] Failed to create FREE subscription:",
      err,
    );
  }
}

/**
 * Upsert user dari Clerk data — return user record + flag isNewUser.
 *
 * Pakai cek findUnique terlebih dahulu (bukan upsert atomic) supaya kita
 * bisa membedakan "create vs update" — kebutuhan ini penting untuk
 * memutuskan kirim welcome notif atau tidak.
 *
 * Race condition antara findUnique & create di-handle dengan fallback ke
 * update saat dapat P2002 (unique constraint violation).
 */
export async function upsertClerkUser(data: {
  clerkId: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
}): Promise<{ user: { id: string }; isNewUser: boolean }> {
  const existing = await prisma.user.findUnique({
    where: { clerkId: data.clerkId },
    select: { id: true },
  });

  if (existing) {
    await prisma.user.update({
      where: { clerkId: data.clerkId },
      data: {
        email: data.email,
        name: data.name,
        imageUrl: data.imageUrl,
      },
    });
    return { user: existing, isNewUser: false };
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        clerkId: data.clerkId,
        email: data.email,
        name: data.name,
        imageUrl: data.imageUrl,
        referralCode: generateReferralCode(),
        subscription: {
          create: {
            status: "ACTIVE",
            plan: "FREE",
            startDate: new Date(),
          },
        },
      },
      select: { id: true },
    });
    return { user: newUser, isNewUser: true };
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      const existingAfterRace = await prisma.user.findUnique({
        where: { clerkId: data.clerkId },
        select: { id: true },
      });
      if (existingAfterRace) {
        await prisma.user.update({
          where: { clerkId: data.clerkId },
          data: {
            email: data.email,
            name: data.name,
            imageUrl: data.imageUrl,
          },
        });
        return { user: existingAfterRace, isNewUser: false };
      }
    }
    throw err;
  }
}

/**
 * Bootstrap user baru: pastikan user, subscription FREE, dan welcome
 * notification ada di database.
 *
 * Aman dipanggil berulang kali (idempotent) — kalau record sudah ada,
 * tidak akan di-duplikat.
 *
 * Dipanggil dari 2 tempat:
 * 1. Webhook Clerk `user.created` — jalur utama (kalau webhook ke-deliver)
 * 2. Endpoint `/api/user` GET — fallback kalau webhook gagal/belum sempat
 *    di-deliver, supaya user tetap dapat welcome experience saat pertama
 *    kali login
 */
export async function bootstrapUser(data: {
  clerkId: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
}): Promise<{ userId: string; isNewUser: boolean }> {
  const { user, isNewUser } = await upsertClerkUser(data);

  // Pastikan subscription FREE ada (terutama untuk user yang dibuat di
  // jalur fallback yang sebelumnya tidak menyertakan subscription).
  await ensureFreeSubscription(user.id);

  // Welcome notif — idempotent. ensureWelcomeNotification sendiri sudah
  // cek apakah notif sudah ada, jadi kita bisa panggil tanpa khawatir
  // duplikat. Tapi sebagai optimization kecil, kalau bukan user baru
  // (sudah pernah ada di DB) kita skip pemanggilan untuk hemat 1 query.
  if (isNewUser) {
    await ensureWelcomeNotification(user.id);
  }

  return { userId: user.id, isNewUser };
}
