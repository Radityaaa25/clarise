import type { Metadata } from "next";
import { Darker_Grotesque, Jost, DM_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { FloatingNavbar } from "@/components/layout/navbar";
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
    "Clarise",
    "Clarise AI",
    "Clarise Platform Belajar AI",
    "Platform Belajar AI Indonesia",
    "Belajar AI Bahasa Indonesia",
    "Kursus AI",
    "AI Tutor Indonesia",
    "LMS AI",
    "Aplikasi Belajar AI",
    "Belajar Pemrograman",
    "Belajar Coding AI",
    "Tutorial AI Indonesia",
    "Kursus Online AI",
    "Bootcamp AI Indonesia",
    "Belajar Prompt Engineering",
    "Belajar Machine Learning Indonesia",
    "Edukasi AI",
    "Teknologi AI Pendidikan",
    "Sistem Pembelajaran Adaptif",
    "Clarise.my.id",
  ],
  authors: [{ name: "Clarise Team" }],
  creator: "Clarise",
  publisher: "Clarise",
  metadataBase: new URL("https://clarise.my.id"),
  openGraph: {
    title: "Clarise — AI-Powered Learning Platform",
    description:
      "Tingkatkan skill kamu dengan AI-Powered Precision. Personalized courses, real-time feedback, dan tutor AI interaktif.",
    url: "https://clarise.my.id",
    siteName: "Clarise",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clarise — AI-Powered Learning Platform",
    description:
      "Tingkatkan skill kamu dengan AI-Powered Precision bersama Clarise AI.",
    creator: "@clarise_id",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      {
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: ["/favicon/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${darkerGrotesque.variable} ${jost.variable} ${dmSans.variable} scroll-smooth`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Clarise",
              url: "https://clarise.my.id",
              logo: "https://clarise.my.id/logoLM.png",
              description:
                "Clarise adalah platform pembelajaran interaktif berbasis Artificial Intelligence (AI) yang menyediakan jalur belajar personal untuk penggunanya di Indonesia.",
              sameAs: ["https://instagram.com/clariseofficial_"],
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <FloatingNavbar />
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
