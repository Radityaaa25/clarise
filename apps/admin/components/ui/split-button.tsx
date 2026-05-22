"use client";

import { ArrowRight } from "lucide-react";
import { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SplitButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string;
  variant?: "primary" | "secondary";
}

export function SplitButton({ children, className, variant = "primary", ...props }: SplitButtonProps) {
  return (
    <a
      className={cn(
        "group relative flex items-center justify-center overflow-hidden rounded-full font-bold transition-all duration-500 px-8 py-3",
        variant === "primary"
          ? "bg-core-blue text-white shadow-lg shadow-core-blue/20 hover:bg-core-blue/90 hover:scale-[1.02] hover:shadow-xl hover:shadow-core-blue/30 active:scale-[0.98]"
          : "border border-black/10 dark:border-white/20 bg-white/50 dark:bg-white/5 text-ink dark:text-white backdrop-blur-sm hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/30 hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {/* 
        This wrapper holds the text and controls the vertical gap.
        On hover, we add a gap in the middle using margin/padding tricks or just translating the clips. 
      */}
      <div className="relative flex items-center justify-center w-full h-full">
        {/* Invisible text to maintain button dimensions */}
        <span className="opacity-0">{children}</span>

        {/* Top half of the text */}
        <span 
          className="absolute inset-0 flex items-center justify-center transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[100%] group-hover:opacity-0"
          style={{ clipPath: "inset(0 0 50% 0)" }}
        >
          {children}
        </span>

        {/* Bottom half of the text */}
        <span 
          className="absolute inset-0 flex items-center justify-center transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[100%] group-hover:opacity-0"
          style={{ clipPath: "inset(50% 0 0 0)" }}
        >
          {children}
        </span>

        {/* Original Arrow - Shoots to the right */}
        <ArrowRight className="absolute right-4 w-4 h-4 transition-all duration-[400ms] ease-in-out group-hover:right-[-2rem] group-hover:opacity-0" />

        {/* New Arrow - Shoots in from the left and stops in the center */}
        <ArrowRight className="absolute left-[-2rem] w-5 h-5 opacity-0 transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:opacity-100 delay-[50ms]" />
      </div>
    </a>
  );
}
