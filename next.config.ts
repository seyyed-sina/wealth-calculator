import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: isProd,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dtijhhlyvooogbmoqewa.supabase.co',
      },
    ],
  },
  transpilePackages: ['lucide-react'],
};

export default nextConfig;
