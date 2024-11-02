import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { MainLayout } from '@components';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'محاسبه خمس آنلاین',
  description: 'به سادگی حساب سال خود را محاسبه کنید',
};

const sahel = localFont({
  src: [
    {
      path: './fonts/Sahel.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Sahel-Bold.woff',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-sahel',
  weight: '400 500',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${sahel.className} antialiased text-gray-600`}>
        <MainLayout>{children}</MainLayout>
        <Analytics />
      </body>
    </html>
  );
}
