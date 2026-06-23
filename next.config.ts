import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable the dev indicator overlay to reduce client-side overhead
  devIndicators: false,

  // Reduce memory usage by limiting how many compiled pages are kept in buffer
  onDemandEntries: {
    // Dispose compiled pages after 15 seconds of inactivity (default: 25s)
    maxInactiveAge: 15 * 1000,
    // Keep only 2 pages in memory at once
    pagesBufferLength: 2,
  },

  // Exclude heavy packages from server-side bundling (use native require instead)
  serverExternalPackages: ["xlsx"],

  // Empty turbopack config — acknowledges Turbopack as the default bundler.
  // Turbopack's file watcher is managed internally and doesn't need manual
  // exclusions like Webpack's watchOptions. The `.next` cache was cleared
  // and telemetry disabled to address resource exhaustion.
  turbopack: {},
};

export default nextConfig;
