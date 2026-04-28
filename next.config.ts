import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PWA: Allow service worker to be served from root
  headers: async () => [
    {
      source: "/sw.js",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=0, must-revalidate",
        },
        {
          key: "Service-Worker-Allowed",
          value: "/",
        },
      ],
    },
  ],

  // Security headers for production
  async rewrites() {
    return [];
  },
};

export default nextConfig;
