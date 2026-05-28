import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve("."),
  allowedDevOrigins: ["192.168.1.3", "192.168.1.5"],
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hoirqrkdgbmvpwutwuwj.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    // Remove console.* calls in production
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
