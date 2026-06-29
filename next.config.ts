import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   experimental: {
    // 必须开启这个标志，Cache Components才能正常工作
    cacheComponents: true,
  },
};

export default nextConfig;
