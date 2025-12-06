import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/common", "@workspace/supabase"],
}

export default nextConfig
