"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, BookOpen, Trophy, Settings } from "lucide-react";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Compass, label: "Jelajahi", href: "/explore" },
  { icon: BookOpen, label: "Kursus Saya", href: "/my-courses" },
  { icon: Trophy, label: "Pencapaian", href: "/achievment" },
  { icon: Settings, label: "Pengaturan", href: "/settings" },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-[calc(64px+env(safe-area-inset-bottom))] bg-canvas dark:bg-void-elevated border-t border-hairline shadow-[0_-4px_16px_rgba(0,0,0,0.05)] z-50 px-2 pb-[env(safe-area-inset-bottom)] flex items-center justify-between">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 flex flex-col items-center justify-center h-full relative"
          >
            {isActive && (
              <div className="absolute top-1 w-1.5 h-1.5 rounded-full bg-core-blue" />
            )}
            <item.icon
              size={22}
              className={`mb-1 mt-2 transition-colors ${
                isActive
                  ? "text-core-blue"
                  : "text-muted hover:text-ink dark:hover:text-white"
              }`}
            />
            <span
              className={`text-[10px] font-medium font-body transition-colors ${
                isActive ? "text-core-blue font-bold" : "text-muted"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
