import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // HSTS - enforce HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Prevent clickjacking (Commented out temporarily for Mobile Simulator testing)
          { key: "X-Frame-Options", value: "DENY" },
          // Prevent MIME type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Control referrer information
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.com https://*.clerk.accounts.dev https://clerk.clarise.my.id https://accounts.clarise.my.id https://*.ingest.sentry.io https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.supabase.co https://img.youtube.com https://*.clerk.accounts.dev https://clerk.clarise.my.id https://accounts.clarise.my.id https://img.clerk.com https://images.clerk.dev",
              "connect-src 'self' https://*.supabase.co https://*.clerk.accounts.dev https://clerk.clarise.my.id https://accounts.clarise.my.id https://*.ingest.sentry.io https://generativelanguage.googleapis.com https://*.upstash.io",
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
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "*.clerk.accounts.dev" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
};

const bundleAnalyzer = withBundleAnalyzer({
// eslint-disable-next-line no-undef
  enabled: process.env.ANALYZE === "true",
});

export default bundleAnalyzer(nextConfig);
