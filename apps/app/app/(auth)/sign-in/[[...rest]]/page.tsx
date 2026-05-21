import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        variables: {
          colorPrimary: "#1A7FCC",
          borderRadius: "0.75rem",
          fontFamily: "var(--font-body)",
        },
        elements: {
          rootBox: "w-full",
          card: "w-full shadow-2xl border border-black/5 rounded-2xl overflow-hidden",
          headerTitle: "font-heading font-black text-3xl",
          headerSubtitle: "opacity-70",
        },
      }}
    />
  );
}
