import { Header } from "@/components/layout/header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { DashboardLayoutClient } from "@/components/layout/dashboard-layout-client";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { bootstrapUser } from "@/lib/user-bootstrap";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { onboardingCompleted: true },
  });

  // Bootstrap user sebelum check onboarding.
  // Sebelumnya: kalau webhook Clerk belum sempat fire, user belum ada di DB,
  // dan check onboarding `if (user && !onboardingCompleted)` skip — user
  // langsung masuk dashboard tanpa onboarding. Setelah refresh baru
  // onboarding redirect (karena user baru dibuat lewat /api/user fallback).
  // Sekarang kita bootstrap eagerly di sini supaya redirect ke /onboarding
  // langsung jalan di sign-up pertama.
  if (!user) {
    const clerk = await currentUser();
    if (!clerk) redirect("/sign-in");

    await bootstrapUser({
      clerkId: userId,
      email: clerk.emailAddresses[0]?.emailAddress ?? "",
      name: `${clerk.firstName ?? ""} ${clerk.lastName ?? ""}`.trim() || null,
      imageUrl: clerk.imageUrl,
    });

    user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { onboardingCompleted: true },
    });
  }

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
