"use client";

import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserButton } from "@clerk/nextjs";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AdminHeader() {
  const { data, mutate } = useSWR(
    "http://localhost:3000/api/notifications",
    fetcher,
  );
  const notifications = data?.notifications || [];
  const unreadCount = data?.unreadCount || 0;

  const handleMarkAllRead = async () => {
    if (unreadCount === 0) return;
    await fetch("http://localhost:3000/api/notifications", { method: "PATCH" });
    mutate(); // Refresh notifications
  };

  return (
    <header className="h-16 border-b-2 border-border bg-card sticky top-0 z-30 flex items-center justify-between px-6 neo-shadow-sm">
      <div className="flex items-center bg-background border-2 border-border px-4 py-2 w-96 neo-shadow-sm">
        <Search className="w-4 h-4 text-muted-foreground mr-2" />
        <input
          type="text"
          placeholder="Search user, course, or transaction..."
          className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder-muted-foreground"
        />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle className="neo-btn bg-card text-foreground p-2 rounded-none" />
        <div className="relative">
          <button
            onClick={() => {
              const el = document.getElementById("admin-notification-dropdown");
              if (el) el.classList.toggle("hidden");
            }}
            onBlur={() => {
              setTimeout(() => {
                const el = document.getElementById(
                  "admin-notification-dropdown",
                );
                if (el) el.classList.add("hidden");
              }, 200);
            }}
            className="neo-btn bg-primary text-primary-foreground p-2 flex items-center justify-center relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive border-2 border-border"></span>
            )}
          </button>

          {/* Admin Notification Dropdown */}
          <div
            id="admin-notification-dropdown"
            className="absolute right-0 mt-2 w-80 border-2 border-border bg-card p-4 neo-shadow-sm hidden z-50"
          >
            <div className="flex items-center justify-between mb-4 border-b-2 border-border pb-2">
              <h3 className="font-bold text-sm text-foreground">
                Notifikasi Sistem
              </h3>
              {unreadCount > 0 && (
                <span className="text-xs font-bold bg-destructive text-destructive-foreground px-2 py-0.5 border-2 border-border">
                  {unreadCount} Baru
                </span>
              )}
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notif: any) => (
                  <div
                    key={notif.id}
                    className={`flex gap-3 p-3 border-2 border-border cursor-pointer neo-shadow-sm ${notif.isRead ? "bg-background" : "bg-accent"}`}
                  >
                    {!notif.isRead && (
                      <div className="h-3 w-3 mt-1 bg-destructive border-2 border-border shrink-0" />
                    )}
                    <div className={notif.isRead ? "ml-3" : ""}>
                      <p className="text-sm font-bold text-foreground">
                        {notif.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notif.body}
                      </p>
                      <p className="text-[10px] font-bold mt-2">
                        {new Date(notif.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    Belum ada notifikasi.
                  </p>
                </div>
              )}
            </div>

            {unreadCount > 0 && (
              <div className="mt-4 pt-2 border-t-2 border-border text-center">
                <button
                  onMouseDown={handleMarkAllRead}
                  className="text-sm font-bold hover:underline"
                >
                  Tandai semua dibaca
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center neo-shadow-sm border-2 border-border bg-secondary">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 rounded-none",
                userButtonAvatarBox: "w-10 h-10 rounded-none",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
