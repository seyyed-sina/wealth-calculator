import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: isProd,
  },
};

export default nextConfig;
