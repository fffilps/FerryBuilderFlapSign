import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloud / proxied previews hit the app from non-localhost hosts; without
  // this, Next blocks client chunks and the board stuck on the SSR shell.
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "cursor",
    "*.cursor.com",
    "*.cursor.sh",
    "*.trycloudflare.com",
  ],
};

export default nextConfig;
