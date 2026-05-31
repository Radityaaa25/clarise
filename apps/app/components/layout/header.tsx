"use client";

import { UserButton } from "@clerk/nextjs";
import { Search, Bell, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import useSWR from "swr";
import { useUser } from "@/hooks/use-user";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Header() {
  const router = useRouter();
  const { data, mutate } = useSWR("/api/notifications", fetcher);
  const notifications = data?.notifications || [];
  const unreadCount = data?.unreadCount || 0;

  const { user } = useUser();
  const isPremium =
    user?.subscription?.plan && user.subscription.plan !== "FREE";

  // ── Search ──
  const [query, setQuery] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/explore?q=${encodeURIComponent(q)}` : "/explore");
  };

  // ── Notification dropdown (React state, bukan manipulasi DOM) ──
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!notifOpen) return;

    // Tutup saat klik di luar area dropdown.
    const onPointerDown = (e: PointerEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    // Tutup saat user scroll (penting di mobile supaya dropdown tidak
    // terus menutupi konten saat halaman digulir).
    const onScroll = () => setNotifOpen(false);
    // Tutup saat tekan Escape.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNotifOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [notifOpen]);

  const handleMarkAllRead = async () => {
    if (unreadCount === 0) return;
    await fetch("/api/notifications", { method: "PATCH" });
    mutate();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-hairline bg-canvas/80 dark:bg-void/80 px-4 md:px-6 backdrop-blur-md gap-3">
      {/* Search Bar — berfungsi: submit menavigasi ke /explore?q= */}
      <form
        onSubmit={handleSearch}
        role="search"
        className="flex items-center flex-1 min-w-0 max-w-md"
      >
        <div className="relative w-full">
          <button
            type="submit"
            aria-label="Cari"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted hover:text-core-blue transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kursus..."
            aria-label="Cari kursus"
            className="w-full h-10 rounded-lg border border-hairline bg-surface-soft dark:bg-void-elevated pl-10 pr-4 text-sm text-ink dark:text-white placeholder:text-muted-soft focus:border-core-blue focus:ring-2 focus:ring-core-blue/20 outline-none transition-all"
          />
        </div>
      </form>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
        {/* Premium Badge — sekarang terlihat juga di mobile (ikon saja) */}
        {isPremium && (
          <div className="flex items-center gap-1.5 bg-spark/10 text-spark px-2 sm:px-3 py-1.5 rounded-full border border-spark/20">
            <Sparkles size={14} />
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
              Premium
            </span>
          </div>
        )}

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="Notifikasi"
            aria-haspopup="true"
            aria-expanded={notifOpen}
            aria-controls="notification-dropdown"
            className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-soft dark:hover:bg-void-elevated text-muted hover:text-ink dark:hover:text-white transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span
                aria-label={`${unreadCount} notifikasi belum dibaca`}
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-error text-white text-[10px] font-bold leading-none flex items-center justify-center border-2 border-canvas dark:border-void"
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown — dirender berdasarkan state */}
          {notifOpen && (
            <div
              id="notification-dropdown"
              role="menu"
              className="fixed top-[70px] left-1/2 -translate-x-1/2 sm:absolute sm:top-auto sm:left-auto sm:translate-x-0 sm:right-0 mt-2 w-[calc(100vw-32px)] sm:w-80 rounded-xl border border-border bg-white p-4 shadow-lg z-50 dark:bg-void-elevated dark:border-hairline animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-ink dark:text-white">
                  Notifikasi
                </h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-muted-foreground bg-secondary dark:bg-void px-2 py-1 rounded-full">
                    {unreadCount} Baru
                  </span>
                )}
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif: { id: string; isRead: boolean; title: string; body: string; createdAt: string }) => (
                    <div
                      key={notif.id}
                      className={`flex gap-3 p-3 rounded-lg transition-colors border ${notif.isRead ? "bg-transparent border-transparent" : "bg-core-blue/5 hover:bg-core-blue/10 border-core-blue/20"}`}
                    >
                      {!notif.isRead && (
                        <div className="h-2 w-2 mt-2 rounded-full bg-core-blue shrink-0" />
                      )}
                      <div className={notif.isRead ? "ml-3" : ""}>
                        <p className="text-sm font-medium text-ink dark:text-white">
                          {notif.title}
                        </p>
                        <p className="text-xs text-muted mt-1">{notif.body}</p>
                        <p className="text-[10px] text-muted-soft mt-2">
                          {new Date(notif.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted">Belum ada notifikasi.</p>
                  </div>
                )}
              </div>

              {unreadCount > 0 && (
                <div className="mt-4 pt-3 border-t border-border dark:border-hairline text-center">
                  <button
                    onClick={handleMarkAllRead}
                    className="text-sm text-core-blue hover:underline font-medium"
                  >
                    Tandai semua dibaca
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-hairline" />

        {/* User Button (Clerk) */}
        <UserButton
          afterSignOutUrl="/sign-in"
          appearance={{ elements: { avatarBox: "h-9 w-9" } }}
        />
      </div>
    </header>
  );
}
