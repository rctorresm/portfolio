import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages: no database, no server actions, no
  // API routes here, so there's no server to host. `headers()` below isn't
  // supported in export mode (needs a live server) — the same protections
  // are set instead via public/_headers, Cloudflare Pages' own convention.
  output: "export",
};

export default nextConfig;
