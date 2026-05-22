import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Proteksi seluruh rute di bawah / kecuali /sign-in
const isPublicRoute = createRouteMatcher(["/sign-in(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const { userId } = await auth();
    
    // 1. Jika belum login, paksa masuk ke halaman custom login Admin kita (bukan bawaan Clerk)
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    
    // 2. Mengecek apakah user memiliki role "admin"
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    
    // Keamanan super ketat: Hanya user yang diset "role": "admin" di Clerk Dashboard yang bisa masuk!
    if (user.publicMetadata.role !== "admin") {
      // Jika bukan admin, lempar kembali ke aplikasi utama (LMS)
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.clarise.my.id';
      return NextResponse.redirect(new URL(`${appUrl}/dashboard`, req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
