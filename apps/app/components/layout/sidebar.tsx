"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Trophy,
  Sparkles,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/explore", label: "Jelajahi Kursus", icon: Compass },
  { href: "/my-courses", label: "Kursus Saya", icon: BookOpen },
  { href: "/achievment", label: "Pencapaian", icon: Trophy },
];

const bottomItems = [
  { href: "/settings", label: "Pengaturan", icon: Settings },
];

export function Sidebar({ 
  collapsed, 
  setCollapsed 
}: { 
  collapsed: boolean; 
  setCollapsed: (val: boolean) => void; 
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-hairline bg-canvas dark:bg-void transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className={`flex h-16 items-center px-4 border-b border-hairline ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
            <Image src="/logoLM.png" alt="Clarise Logo" width={80} height={26} className="w-[80px] h-auto dark:hidden" />
            <Image src="/logoDM.png" alt="Clarise Logo" width={80} height={26} className="w-[80px] h-auto hidden dark:block" />
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`hidden lg:flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
            collapsed 
              ? "bg-sky text-white hover:bg-sky/90 shadow-sm" 
              : "hover:bg-surface-soft dark:hover:bg-void-elevated text-muted hover:text-ink dark:hover:text-white"
          }`}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-core-blue/10 text-core-blue dark:bg-core-blue/20 dark:text-sky"
                  : "text-body dark:text-white/70 hover:bg-surface-soft dark:hover:bg-void-elevated hover:text-ink dark:hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-core-blue dark:text-sky" : "text-muted dark:text-white/70 group-hover:text-ink dark:group-hover:text-white"
                )}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-4 h-px bg-hairline" />

        {/* Generate Course (Premium) */}
        <Link
          href="/generate"
          className={cn(
            "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
            pathname === "/generate"
              ? "bg-spark/10 text-spark dark:bg-spark/20"
              : "text-body dark:text-white/70 hover:bg-surface-soft dark:hover:bg-void-elevated hover:text-ink dark:hover:text-white"
          )}
        >
          <Sparkles
            className={cn(
              "h-5 w-5 shrink-0 transition-colors",
              pathname === "/generate" ? "text-spark" : "text-muted dark:text-white/70 group-hover:text-spark"
            )}
          />
          {!collapsed && <span className="truncate">Buat Kursus AI</span>}
          {!collapsed && (
            <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-spark/10 text-spark">
              Pro
            </span>
          )}
        </Link>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-hairline px-3 py-4 space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-core-blue/10 text-core-blue dark:bg-core-blue/20 dark:text-sky"
                  : "text-body dark:text-white/70 hover:bg-surface-soft dark:hover:bg-void-elevated hover:text-ink dark:hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-core-blue dark:text-sky" : "text-muted dark:text-white/70 group-hover:text-ink dark:group-hover:text-white"
                )}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
