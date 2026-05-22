"use client";

import { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-canvas overflow-hidden">
      {/* Background for light mode only */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-[60%] w-[60%] rounded-full bg-core-blue/15 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[60%] w-[60%] rounded-full bg-sky/10 blur-[150px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center p-6 sm:p-0 mx-auto">
        {/* Brand / Logo */}
        <a href={process.env.NEXT_PUBLIC_APP_URL || "/"} className="mb-8 -mt-7 flex justify-center group">
          <Image src="/logoLM.png" alt="Clarise Logo" width={180} height={60} className="w-[140px] sm:w-[180px] h-auto dark:hidden" />
          <Image src="/logoDM.png" alt="Clarise Logo" width={180} height={60} className="w-[140px] sm:w-[180px] h-auto hidden dark:block" />
        </a>

        {/* Form Container */}
        <div className="w-full flex justify-center -mt-20">
          {children}
        </div>
      </div>
    </div>
  );
}
