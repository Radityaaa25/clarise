"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Flag, 
  CreditCard, 
  Bot, 
  Megaphone,
  Settings,
  LogOut,
  Tag
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/users", label: "Pengguna (Users)", icon: Users },
  { href: "/courses", label: "Kursus (Courses)", icon: BookOpen },
  { href: "/vouchers", label: "Voucher", icon: Tag },
  { href: "/reports", label: "Laporan (Reports)", icon: Flag },
  { href: "/transactions", label: "Transaksi", icon: CreditCard },
  { href: "/ai", label: "Monitor AI", icon: Bot },
  { href: "/announcements", label: "Pengumuman", icon: Megaphone },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = mounted && currentTheme === 'dark';

  return (
    <aside className="w-64 border-r-2 border-border h-screen sticky top-0 bg-card flex flex-col z-40">
      <div className="p-6 border-b-2 border-border">
        <Link href="/" className="flex items-center overflow-hidden gap-3 -mb-10 -mt-10">
          <Image 
            src={isDark ? "/logoDM.png" : "/logoLM.png"} 
            alt="Clarise Admin" 
            width={120} 
            height={40} 
            className="w-[120px] h-auto object-contain transition-opacity duration-300" 
            priority
          />
          <span className="text-sm font-bold px-2 py-0.5 bg-secondary text-secondary-foreground border-2 border-border hidden lg:block">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 font-bold border-2 transition-all ${
                isActive 
                  ? "bg-primary text-primary-foreground border-border neo-shadow-sm" 
                  : "bg-transparent text-muted-foreground border-transparent hover:border-border hover:bg-accent hover:text-accent-foreground hover:neo-shadow-sm"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t-2 border-border space-y-2 bg-card">
        <button className="w-full flex items-center gap-3 px-3 py-3 font-bold border-2 border-transparent text-muted-foreground hover:border-border hover:bg-secondary hover:text-secondary-foreground hover:neo-shadow-sm transition-all">
          <Settings className="w-5 h-5" />
          Pengaturan
        </button>
        <SignOutButton signOutOptions={{ redirectUrl: '/sign-in' }}>
          <button className="neo-btn w-full flex items-center gap-3 px-3 py-3 bg-destructive text-destructive-foreground">
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
}
