import type { Metadata } from "next";
import { Darker_Grotesque, Jost, DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "@/components/layout/error-boundary";
import { SpeedInsights } from "@vercel/speed-insights/next";
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

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Clarise — AI-Powered Learning Platform",
    template: "%s | Clarise",
  },
  description:
    "Master new skills with AI-powered adaptive learning. Personalized courses, real-time feedback, and gamified progress tracking. Belajar AI dengan tutor interaktif.",
  keywords: [
    "Clarise App", "Clarise AI", "Platform Belajar AI", "Kursus AI Interaktif",
    "Belajar AI Bahasa Indonesia", "Dashboard Belajar", "LMS AI Indonesia"
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://app.clarise.my.id"
  ),
  openGraph: {
    title: "Clarise App — AI-Powered Learning Platform",
    description:
      "Akses dashboard belajarmu, selesaikan modul, dan tanya AI Tutor. Clarise: Belajar AI dengan mudah.",
    type: "website",
    siteName: "Clarise App",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clarise App — AI-Powered Learning Platform",
    description: "Akses dashboard belajarmu dan tanya AI Tutor di Clarise App.",
  },
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon/favicon.ico'],
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
        lang="id"
        suppressHydrationWarning
        className={`${darkerGrotesque.variable} ${jost.variable} ${dmSans.variable}`}
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
              <SpeedInsights />
            </ThemeProvider>
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  );
}
