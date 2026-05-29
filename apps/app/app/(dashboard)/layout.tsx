import { Header } from "@/components/layout/header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { DashboardLayoutClient } from "@/components/layout/dashboard-layout-client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { onboardingCompleted: true },
  });

  if (user && !user.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-canvas dark:bg-void text-ink dark:text-frost pb-[calc(64px+env(safe-area-inset-bottom))] md:pb-0 transition-colors">
      <DashboardLayoutClient header={<Header />}>
        {children}
      </DashboardLayoutClient>

      <MobileBottomNav />
    </div>
  );
}
