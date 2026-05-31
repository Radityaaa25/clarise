import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas dark:bg-void text-ink dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Background gradients for aesthetic */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-core-blue/15 dark:bg-blue-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 dark:bg-purple-500/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full pt-16 md:pt-0">
        <OnboardingWizard />
      </div>
    </div>
  );
}
