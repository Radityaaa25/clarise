import { auth, clerkClient } from "@clerk/nextjs/server";

/**
 * Defense-in-depth auth check untuk server actions admin.
 *
 * Walaupun middleware (`apps/admin/middleware.ts`) sudah memblokir non-admin,
 * setiap server action WAJIB validasi ulang. Ini melindungi dari:
 * - Misconfiguration matcher middleware
 * - Bug di Clerk middleware
 * - Server action endpoint yang ke-trigger lewat path yang tidak ter-cover middleware
 *
 * Throw Error("UNAUTHORIZED") jika belum login.
 * Throw Error("FORBIDDEN") jika bukan admin.
 */
export async function requireAdmin(): Promise<{ userId: string }> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  if (user.publicMetadata.role !== "admin") {
    throw new Error("FORBIDDEN");
  }

  return { userId };
}

/**
 * Versi safe — return result object, bukan throw.
 * Berguna jika server action mau handle gracefully tanpa crash.
 */
export async function checkAdmin(): Promise<
  | { ok: true; userId: string }
  | { ok: false; error: "UNAUTHORIZED" | "FORBIDDEN" }
> {
  try {
    const { userId } = await requireAdmin();
    return { ok: true, userId };
  } catch (err) {
    const message = err instanceof Error ? err.message : "FORBIDDEN";
    if (message === "UNAUTHORIZED") return { ok: false, error: "UNAUTHORIZED" };
    return { ok: false, error: "FORBIDDEN" };
  }
}
