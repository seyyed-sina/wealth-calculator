import { AuthLayout } from '@components';

export default function AuthPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout>{children}</AuthLayout>;
}
