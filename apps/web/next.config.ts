import type { NextConfig } from "next"

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  experimental: {
    // Forward browser logs to the terminal for easier debugging
    browserDebugInfoInTerminal: true,
    // turbopackFileSystemCacheForDev: true,
    // Enable support for `global-not-found`, which allows you to more easily define a global 404 page.
    globalNotFound: true,
    inlineCss: true,
  },
}

export default nextConfig
