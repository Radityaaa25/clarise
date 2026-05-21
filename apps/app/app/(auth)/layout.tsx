"use client";

import { ReactNode } from "react";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-canvas overflow-hidden">
      {/* Background for light mode only */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-[60%] w-[60%] rounded-full bg-core-blue/15 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[60%] w-[60%] rounded-full bg-sky/10 blur-[150px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center p-6 sm:p-0">
        {/* Brand / Logo */}
        <a href={process.env.NEXT_PUBLIC_APP_URL || "/"} className="mb-8 flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-core-blue text-white shadow-xl shadow-core-blue/20 transition-transform group-hover:scale-105">
            <span className="font-heading text-xl font-black">C</span>
          </div>
          <span className="font-heading text-2xl font-black tracking-wide text-ink">
            Clarise.
          </span>
        </a>

        {/* Form Container */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
