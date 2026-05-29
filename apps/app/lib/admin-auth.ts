import { auth, clerkClient } from "@clerk/nextjs/server";

/**
 * Auth guard untuk API routes admin di apps/app.
 *
 * Single source of truth untuk admin status: Clerk publicMetadata.role.
 * Sebelumnya beberapa endpoint cek `prisma.user.role === "ADMIN"`, tapi
 * itu tidak ter-sync otomatis dengan setting yang lo set di Clerk Dashboard.
 *
 * Sekarang konsisten dengan `apps/admin/middleware.ts` dan
 * `apps/admin/lib/auth-guard.ts` — semua refer ke Clerk publicMetadata.
 *
 * Returns:
 * - `{ ok: true, userId }` — user adalah admin
 * - `{ ok: false, error }` — bukan admin / belum login
 */
export async function checkApiAdmin(): Promise<
  | { ok: true; userId: string }
  | { ok: false; error: "UNAUTHORIZED" | "FORBIDDEN" }
> {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false, error: "UNAUTHORIZED" };
  }

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    if (user.publicMetadata.role !== "admin") {
      return { ok: false, error: "FORBIDDEN" };
    }

    return { ok: true, userId };
  } catch (err) {
    console.error("[API_ADMIN_AUTH] Failed to verify admin role:", err);
    return { ok: false, error: "FORBIDDEN" };
  }
}
