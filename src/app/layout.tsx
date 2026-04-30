import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import PWAUpdatePrompt from "@/components/PWAUpdatePrompt";
import InstallBanner from "@/components/InstallBanner";
import { Toaster } from "react-hot-toast";

// ── Fonts ─────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// ── Metadata (SEO + PWA) ──────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Fleer Fleet Intelligence",
    template: "%s | Fleer",
  },
  description: "Next-gen fleet tracking and financial anomaly detection.",
  keywords: ["fleet management", "tracking", "logistics", "anomaly detection", "fintech"],
  authors: [{ name: "Fleer" }],

  // PWA / mobile
  applicationName: "Fleer",
  appleWebApp: {
    capable: true,
    title: "Fleer",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },

  // Manifest
  manifest: "/manifest.json",

  // Open Graph
  openGraph: {
    type: "website",
    siteName: "Fleer",
    title: "Fleer",
    description: "Fleer — your progressive web app",
  },

  // Icons
  icons: {
    icon: [
      { url: "/icons/icon-96x96.png",  sizes: "96x96",  type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
  },
};

// ── Viewport ──────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",       // Safe area support (notch phones)
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#0f0f13" },
    { media: "(prefers-color-scheme: light)", color: "#6c63ff" },
  ],
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        {/* PWA plumbing — renders nothing visible */}
        <ServiceWorkerRegistration />

        {/* Main content */}
        {children}

        {/* PWA prompts — float over content */}
        <PWAUpdatePrompt />
        <InstallBanner />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1A2235',
              color: '#E2E8F0',
              border: '1px solid #1E2D42',
              borderRadius: '12px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
            },
            error: {
              style: {
                borderLeft: '3px solid #EF4444',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
