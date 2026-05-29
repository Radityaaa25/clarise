"use client";

import { UserButton } from "@clerk/nextjs";
import { Search, Bell, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import useSWR from "swr";
import { useUser } from "@/hooks/use-user";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Header() {
  const { data, mutate } = useSWR("/api/notifications", fetcher);
  const notifications = data?.notifications || [];
  const unreadCount = data?.unreadCount || 0;

  const { user } = useUser();
  const isPremium =
    user?.subscription?.plan && user.subscription.plan !== "FREE";

  const handleMarkAllRead = async () => {
    if (unreadCount === 0) return;
    await fetch("/api/notifications", { method: "PATCH" });
    mutate(); // Refresh notifications
  };

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
        <div className="relative">
          <button
            onClick={() => {
              const el = document.getElementById("notification-dropdown");
              if (el) el.classList.toggle("hidden");
            }}
            onBlur={() => {
              setTimeout(() => {
                const el = document.getElementById("notification-dropdown");
                if (el) el.classList.add("hidden");
              }, 200);
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-soft dark:hover:bg-void-elevated text-muted hover:text-ink dark:hover:text-white transition-colors"
          >
            <Bell className="h-5 w-5" />
            {/* Notification dot */}
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-error" />
            )}
          </button>

          {/* Notification Dropdown */}
          <div
            id="notification-dropdown"
            className="fixed top-[70px] left-1/2 -translate-x-1/2 sm:absolute sm:top-auto sm:left-auto sm:translate-x-0 sm:right-0 mt-2 w-[calc(100vw-32px)] sm:w-80 rounded-xl border border-border bg-white p-4 shadow-lg hidden z-50 dark:bg-void-elevated dark:border-hairline"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-ink dark:text-white">
                Notifikasi
              </h3>
              {unreadCount > 0 && (
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                  {unreadCount} Baru
                </span>
              )}
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif: any) => (
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
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Divider */}
        <div className="h-6 w-px bg-hairline" />

        {/* Premium Badge */}
        {isPremium && (
          <div className="hidden sm:flex items-center gap-1.5 bg-spark/10 text-spark px-3 py-1.5 rounded-full border border-spark/20">
            <Sparkles size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Premium
            </span>
          </div>
        )}

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
