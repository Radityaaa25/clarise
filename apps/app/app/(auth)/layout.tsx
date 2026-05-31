"use client";

import { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-canvas py-8 px-4 sm:px-6">
      {/* Background for light mode only */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] h-[60%] w-[60%] rounded-full bg-core-blue/15 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[60%] w-[60%] rounded-full bg-sky/10 blur-[150px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center my-auto">
        {/* Brand / Logo */}
        <a
          href={process.env.NEXT_PUBLIC_APP_URL || "/"}
          className="flex justify-center group relative z-20 -mb-4 hover:opacity-90 transition-opacity"
        >
          <Image
            src="/logoLM.png"
            alt="Clarise Logo"
            width={180}
            height={60}
            className="w-[140px] sm:w-[170px] h-auto"
          />
        </a>

        {/* Form Container */}
        <div className="w-full flex justify-center">{children}</div>
      </div>
    </div>
  );
}
