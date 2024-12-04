'use client';;
import { memo, PropsWithChildren } from 'react';

import { usePathname } from 'next/navigation';

import { AuthHeader, MainHeader, Providers, SidebarAnimate } from '@components';
import { routes } from '@constants';

type MainLayoutProps = PropsWithChildren;

export const MainLayout = memo(({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  return (
    <main className="flex flex-col min-h-dvh">
      <Providers>
        {pathname === routes.SIGN_IN || pathname === routes.SIGN_UP ? (
          <AuthHeader />
        ) : (
          <>
            <MainHeader />
            <SidebarAnimate />
          </>
        )}
        <div className="flex flex-col flex-1 bg-white mt-18 min-h-[calc(100dvh-76px)] overflow-y-auto overflow-x-hidden scrollbar-none container max-w-2xl">
          {children}
        </div>
      </Providers>
    </main>
  );
});

MainLayout.displayName = 'MainLayout';
