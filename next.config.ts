import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: isProd,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  transpilePackages: ['lucide-react'],
};

export default nextConfig;
