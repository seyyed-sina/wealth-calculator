import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';

import { MainLayout } from '@components';
import { colorValue, vazir } from '@constants';

import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: {
    default: 'خمس من - محاسبه سریع و آنلاین خمس',
    template: '%s | خمس من',
  },
  description:
    'با اپلیکیشن خمس من، خمس دارایی‌ها و حساب سال درآمد خود را به‌سادگی و با دقت، آنلاین محاسبه کنید. مدیریت مالی اسلامی سریع و مطمئن با رابط کاربری آسان.',
  openGraph: {
    title: {
      default: 'خمس من - محاسبه سریع و آنلاین خمس',
      template: '%s | خمس من',
    },
    description:
      'با اپلیکیشن خمس من، خمس دارایی‌ها و حساب سال درآمد خود را به‌سادگی و با دقت، آنلاین محاسبه کنید. مدیریت مالی اسلامی سریع و مطمئن با رابط کاربری آسان.',
  },
};

export const viewport: Viewport = {
  themeColor: colorValue.primary.DEFAULT,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="font-vazir antialiased text-text font-normal">
        <MainLayout>{children}</MainLayout>
        <Analytics />
      </body>
    </html>
  );
}
