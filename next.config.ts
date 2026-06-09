import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/seminario",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
