import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@ours-medical-note/supabase", "@ours-medical-note/ui"],
};

export default nextConfig;
