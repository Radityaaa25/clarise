import type { Metadata } from "next";
import { Darker_Grotesque, Jost } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "@/components/layout/error-boundary";
import "./globals.css";

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-heading",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Clarise — AI-Powered Learning Platform",
    template: "%s | Clarise",
  },
  description:
    "Master new skills with AI-powered adaptive learning. Personalized courses, real-time feedback, and gamified progress tracking.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://app.clarise.com"
  ),
  openGraph: {
    title: "Clarise — AI-Powered Learning Platform",
    description:
      "Master new skills with AI-powered adaptive learning. Personalized courses, real-time feedback, and gamified progress tracking.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in"  dynamic>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${darkerGrotesque.variable} ${jost.variable}`}
      >
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body suppressHydrationWarning>
          <ErrorBoundary>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  );
}
