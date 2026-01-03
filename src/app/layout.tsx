import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://timely-countdown.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Timely - Create & Share Beautiful Countdowns",
    template: "%s | Timely",
  },
  description: "Create stunning, shareable countdowns for birthdays, anniversaries, events, and special moments. Free countdown timer with custom images and descriptions.",
  keywords: [
    "countdown timer",
    "event countdown",
    "birthday countdown",
    "anniversary countdown",
    "shareable countdown",
    "custom countdown",
    "countdown maker",
    "days until",
    "event timer",
  ],
  authors: [{ name: "Filmoja" }],
  creator: "Filmoja",
  publisher: "Filmoja",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Timely - Create & Share Beautiful Countdowns",
    description: "Create stunning, shareable countdowns for birthdays, anniversaries, events, and special moments.",
    siteName: "Timely",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Timely - Countdown Timer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timely - Create & Share Beautiful Countdowns",
    description: "Create stunning, shareable countdowns for birthdays, anniversaries, events, and special moments.",
    images: ["/og-image.png"],
    creator: "@filmoja",
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
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={siteUrl} />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Timely" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Theme init script to avoid flash of incorrect theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');else if(t==='light')document.documentElement.classList.remove('dark');else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark');}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-900`}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-transparent">
          <div className="max-w-4xl mx-auto px-4 py-3 flex justify-end">
            <ThemeToggle />
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}