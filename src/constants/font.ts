import localFont from "next/font/local";

export const vazir = localFont({
  src: [
    {
      path: '../../public/fonts/vazir/Vazirmatn-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vazir/Vazirmatn-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vazir/Vazirmatn-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/vazir/Vazirmatn-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-vazir',
  weight: '300 400 500 600',
});
