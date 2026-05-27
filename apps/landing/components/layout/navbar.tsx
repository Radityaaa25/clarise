"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowButton } from "@/components/ui/arrow-button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function FloatingNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sembunyikan navbar di halaman tertentu
  if (["/careers", "/privacy", "/about"].includes(pathname)) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 flex justify-center px-4 md:px-4 transition-all duration-300",
        isScrolled ? "pt-2 md:pt-4" : "pt-4 md:pt-8"
      )}
    >
      <div
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full border px-4 md:px-6 py-2 md:py-3 transition-all duration-300 h-[56px] md:h-[64px]",
          isScrolled
            ? "border-black/5 dark:border-white/10 bg-white/70 dark:bg-void/80 shadow-lg backdrop-blur-md"
            : "border-transparent bg-transparent"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logoLM.png" alt="Clarise Logo" width={80} height={26} className="w-[60px] md:w-[80px] h-auto dark:hidden" />
          <Image src="/logoDM.png" alt="Clarise Logo" width={80} height={26} className="w-[60px] md:w-[80px] h-auto hidden dark:block" />
        </Link>

        {/* Desktop Navigation & Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Berlangganan — simple outline, no arrow animation */}
          <Link
            href="/pricing"
            className="btn-outline-capsule px-5 py-2 text-sm"
          >
            Berlangganan
          </Link>

          {/* Coba Gratis — solid blue with split arrow */}
          <ArrowButton
            href={`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/sign-up`}
            className="px-5 py-2 text-sm"
          >
            Coba Gratis
          </ArrowButton>

          <div className="h-6 w-px bg-black/10 dark:bg-white/10" />
          <ThemeToggle />
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -mr-2 text-ink dark:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[calc(100%+8px)] left-4 right-4 rounded-2xl border border-hairline bg-white/90 dark:bg-void/90 p-4 shadow-xl backdrop-blur-lg flex flex-col gap-3 md:hidden">
          <Link
            href="/pricing"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex w-full items-center justify-center rounded-xl border border-hairline bg-surface-soft dark:bg-void-elevated py-3 text-sm font-bold text-ink dark:text-white"
          >
            Berlangganan
          </Link>
          <ArrowButton
            href={`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/sign-up`}
            className="w-full py-3"
          >
            Coba Gratis
          </ArrowButton>
        </div>
      )}
    </header>
  );
}
