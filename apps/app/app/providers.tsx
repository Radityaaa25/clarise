"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      // Auto-capture JS exceptions — pengganti Sentry
      capture_exceptions: true,
      // Hanya buat profile untuk user yang sudah identify()
      person_profiles: "identified_only",
      // Tidak capture halaman secara otomatis agar kita kontrol manual via usePathname
      capture_pageview: false,
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
