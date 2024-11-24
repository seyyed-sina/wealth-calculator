import { memo, PropsWithChildren } from 'react';

import { MainHeader, Providers, SidebarAnimate } from '@components';

type MainLayoutProps = PropsWithChildren;

export const MainLayout = memo(({ children }: MainLayoutProps) => {
  return (
    <main className="flex flex-col min-h-dvh">
      <MainHeader />
      <SidebarAnimate />
      <Providers>{children}</Providers>
    </main>
  );
});

MainLayout.displayName = 'MainLayout';
