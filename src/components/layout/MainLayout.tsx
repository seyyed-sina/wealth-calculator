import { memo, PropsWithChildren } from 'react';

import { MainHeader } from '@components';

type MainLayoutProps = PropsWithChildren;

export const MainLayout = memo(({ children }: MainLayoutProps) => {
  return (
    <main className="flex flex-col bg-gray-50 min-h-dvh">
      <MainHeader />
      <div className="flex flex-1 bg-white">{children}</div>
    </main>
  );
});

MainLayout.displayName = 'MainLayout';
