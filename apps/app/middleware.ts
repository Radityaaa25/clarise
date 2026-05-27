import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { isAllowedOrigin } from "@/lib/cors"

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/explore(.*)",
  "/my-courses(.*)",
  "/achievement(.*)",
  "/achievment(.*)",
  "/course(.*)",
  "/generate(.*)",
  "/settings(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  // Handle CORS preflight (OPTIONS) — harus dijawab langsung
  if (req.method === "OPTIONS" && req.nextUrl.pathname.startsWith("/api")) {
    const origin = req.headers.get("origin") ?? "";
    const isAllowed = isAllowedOrigin(origin);
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": isAllowed ? origin : "",
        "Access-Control-Allow-Methods": "GET,OPTIONS,POST,PUT,PATCH,DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "600",
      },
    });
  }

  // Lapisan 1: Clerk memastikan user sudah login untuk semua protected routes
  if (isProtectedRoute(req)) await auth.protect()

  // JANGAN return apapun — biarkan Clerk yang mengurus response
  // agar auth() di API route bisa membaca session/token dengan benar.
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
