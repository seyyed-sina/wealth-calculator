import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import { MainLayout } from '@components';
import { colorValue } from '@constants';

import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: {
    default: 'خمس من - محاسبه دقیق و سریع خمس آنلاین',
    template: '%s | خمس من',
  },
  description:
    'با اپلیکیشن خمس من، خمس دارایی‌ها و حساب سال درآمد خود را به‌سادگی و با دقت آنلاین محاسبه کنید. مدیریت مالی اسلامی سریع و مطمئن با رابط کاربری آسان.',
  openGraph: {
    title: {
      default: 'خمس من - محاسبه دقیق و سریع خمس آنلاین',
      template: '%s | خمس من',
    },
    description:
      'با اپلیکیشن خمس من، خمس دارایی‌ها و حساب سال درآمد خود را به‌سادگی و با دقت آنلاین محاسبه کنید. مدیریت مالی اسلامی سریع و مطمئن با رابط کاربری آسان.',
  },
};

export const viewport: Viewport = {
  themeColor: colorValue.primary.DEFAULT,
};

// const sahel = localFont({
//   src: [
//     {
//       path: './fonts/Sahel.woff',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: './fonts/Sahel-Bold.woff',
//       weight: '500',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-sahel',
//   weight: '400 500',
// });

const vazir = localFont({
  src: [
    {
      path: './fonts/vazir/Vazirmatn-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/vazir/Vazirmatn-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/vazir/Vazirmatn-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/vazir/Vazirmatn-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-vazir',
  weight: '300 400 500 600',
});

// const notoSans = Noto_Sans_Arabic({
//   subsets: ['arabic'],
//   weight: ['400', '500', '600', '700'],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.className} antialiased text-text font-normal`}>
        <MainLayout>{children}</MainLayout>
        <Analytics />
      </body>
    </html>
  );
}
