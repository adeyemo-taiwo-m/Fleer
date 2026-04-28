import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import PWAUpdatePrompt from "@/components/PWAUpdatePrompt";
import InstallBanner from "@/components/InstallBanner";

// ── Fonts ─────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ── Metadata (SEO + PWA) ──────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Fleer",
    template: "%s | Fleer",
  },
  description: "Fleer — your progressive web app",
  keywords: ["fleer", "pwa", "progressive web app"],
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
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        {/* PWA plumbing — renders nothing visible */}
        <ServiceWorkerRegistration />

        {/* Main content */}
        {children}

        {/* PWA prompts — float over content */}
        <PWAUpdatePrompt />
        <InstallBanner />
      </body>
    </html>
  );
}
