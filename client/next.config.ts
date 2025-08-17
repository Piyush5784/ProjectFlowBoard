import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["pm-s3-images.s3.us-east-2.amazonaws.com"],
  },
  /* config options here */
};

export default nextConfig;
