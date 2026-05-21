"use client";

import { UserButton } from "@clerk/nextjs";
import { Search, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-hairline bg-canvas/80 dark:bg-void/80 px-6 backdrop-blur-md">
      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Cari kursus, materi, atau topik..."
            className="w-full h-10 rounded-lg border border-hairline bg-surface-soft dark:bg-void-elevated pl-10 pr-4 text-sm text-ink dark:text-white placeholder:text-muted-soft focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-soft dark:hover:bg-void-elevated text-muted hover:text-ink dark:hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-error" />
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Divider */}
        <div className="h-6 w-px bg-hairline" />

        {/* User Button (Clerk) */}
        <UserButton
          afterSignOutUrl="/sign-in"
          appearance={{
            elements: {
              avatarBox: "h-9 w-9",
            },
          }}
        />
      </div>
    </header>
  );
}
