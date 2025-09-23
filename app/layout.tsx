import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { CameroonBackground } from "@/components/layout/cameroon-background";
import { siteConfig } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Cloud Computing",
    "Edge Computing",
    "IoT",
    "Innovation",
    "Cameroun",
    "Recherche",
    "Technologie",
  ],
  authors: [
    {
      name: "C5IN",
      url: siteConfig.url,
    },
  ],
  creator: "C5IN",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@c5in_cameroon",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          {/* Cameroon flag background for all pages */}
          <CameroonBackground variant="minimal" />
          
          <div className="relative z-10 flex min-h-screen flex-col">
            <Header />
            <main className="flex-1" role="main">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
