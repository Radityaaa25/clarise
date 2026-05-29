/* eslint-env node */
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Admin dashboard sebenarnya ada di "/" (route group "(dashboard)").
      // Kalau ada yang akses /dashboard langsung (misal dari link lama atau
      // konfigurasi Clerk default), redirect ke root admin.
      {
        source: "/dashboard",
        destination: "/",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.com https://*.clerk.accounts.dev https://clerk.clarise.my.id https://accounts.clarise.my.id https://*.ingest.sentry.io https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.supabase.co https://img.youtube.com https://*.clerk.accounts.dev https://clerk.clarise.my.id https://accounts.clarise.my.id https://img.clerk.com https://images.clerk.dev",
              "connect-src 'self' http://localhost:3000 https://app.clarise.my.id https://*.supabase.co https://*.clerk.accounts.dev https://clerk.clarise.my.id https://accounts.clarise.my.id https://*.ingest.sentry.io https://generativelanguage.googleapis.com https://*.upstash.io",
              "frame-src https://*.clerk.accounts.dev https://clerk.clarise.my.id https://accounts.clarise.my.id https://challenges.cloudflare.com https://www.youtube.com",
              "worker-src 'self' blob:",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;