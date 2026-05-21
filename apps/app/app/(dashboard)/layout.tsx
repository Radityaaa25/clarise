import { Header } from "@/components/layout/header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { DashboardLayoutClient } from "@/components/layout/dashboard-layout-client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas dark:bg-void text-ink dark:text-frost pb-[calc(64px+env(safe-area-inset-bottom))] md:pb-0 transition-colors">
      <DashboardLayoutClient header={<Header />}>
        {children}
      </DashboardLayoutClient>

      <MobileBottomNav />
    </div>
  );
}
