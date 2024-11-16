import { memo, PropsWithChildren } from 'react';

import { MainHeader, Providers, SidebarAnimate } from '@components';

type MainLayoutProps = PropsWithChildren;

export const MainLayout = memo(({ children }: MainLayoutProps) => {
  return (
    <main className="flex flex-col min-h-dvh">
      <MainHeader />
      <SidebarAnimate />
      <div className="flex flex-col flex-1 bg-white mt-18 min-h-[calc(100dvh-76px)] overflow-y-auto overflow-x-hidden scrollbar-none container max-w-2xl">
        {children}
      </div>
      <Providers />
    </main>
  );
});

MainLayout.displayName = 'MainLayout';
