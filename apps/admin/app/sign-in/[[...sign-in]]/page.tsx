import { SignIn } from "@clerk/nextjs";

export default function AdminSignInPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background gradients for aesthetic */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto p-6 flex flex-col items-center">
        <div className="mb-4 flex flex-col items-center">
          <img
            src="/logoDM.png"
            alt="Clarise Admin"
            className="h-50 w-auto object-contain -mb-16 -mt-20 dark:hidden"
          />
          <img
            src="/logoLM.png"
            alt="Clarise Admin"
            className="h-50 w-auto object-contain -mb-16 -mt-20 hidden dark:block"
          />
          <p className="text-muted-foreground mt-2 text-center">
            Login untuk mengakses panel manajemen sistem.
          </p>
        </div>

        <SignIn
          path="/sign-in"
          fallbackRedirectUrl="/"
          signUpFallbackRedirectUrl="/"
          appearance={{
            elements: {
              card: "border-2 border-border shadow-none rounded-none w-full neo-shadow-md bg-card",
              headerTitle: "text-foreground font-black font-heading",
              headerSubtitle: "text-muted-foreground",
              formFieldLabel: "text-foreground font-bold",
              formFieldInput:
                "border-2 border-border rounded-none bg-background text-foreground focus:ring-0 focus:border-primary transition-colors",
              formButtonPrimary:
                "bg-primary text-primary-foreground border-2 border-transparent rounded-none hover:bg-primary/90 font-bold transition-colors neo-btn w-full",
              footerAction: "!hidden",
              dividerRow: "!hidden",
              socialButtons: "!hidden",
              socialButtonsBlockButton: "!hidden",
            },
          }}
        />
      </div>
    </div>
  );
}
