import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserButton } from "@clerk/nextjs";

export function AdminHeader() {
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
        <button className="neo-btn bg-primary text-primary-foreground p-2 flex items-center justify-center relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive border-2 border-border"></span>
        </button>
        <div className="flex items-center justify-center neo-shadow-sm border-2 border-border bg-secondary">
          <UserButton 
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 rounded-none",
                userButtonAvatarBox: "w-10 h-10 rounded-none",
              }
            }}
          />
        </div>
      </div>
    </header>
  );
}
