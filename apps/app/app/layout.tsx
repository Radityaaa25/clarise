import type { Metadata } from "next";
import { Darker_Grotesque, DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${darkerGrotesque.variable} ${dmSans.variable}`}
      >
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
