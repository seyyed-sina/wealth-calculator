'use client';
import { memo, PropsWithChildren } from 'react';

import { usePathname } from 'next/navigation';

import { Providers } from '@components';
import { routes } from '@constants';

type AuthLayoutProps = PropsWithChildren;

export const AuthLayout = memo(({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  return (
    <main className="flex flex-col min-h-dvh">
      <header className="border-solid border-b border-b-gray-100 bg-gray-50 h-18 fixed top-0 w-full z-20">
        <div className="container max-w-2xl flex items-center justify-center text-center h-full relative">
          <h1 className="text-xl font-bold">
            {pathname === routes.SIGN_IN ? 'ورود' : 'ثبت نام'}
          </h1>
        </div>
      </header>
      <div className="flex flex-col flex-1 bg-white mt-18 min-h-[calc(100dvh-76px)] overflow-y-auto overflow-x-hidden scrollbar-none container max-w-2xl">
        {children}
      </div>
      <Providers />
    </main>
  );
});

AuthLayout.displayName = 'AuthLayout';
