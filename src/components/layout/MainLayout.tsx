import { memo, PropsWithChildren } from 'react';

import { MainHeader } from '@components';

type MainLayoutProps = PropsWithChildren;

export const MainLayout = memo(({ children }: MainLayoutProps) => {
  return (
    <main className="flex flex-col min-h-dvh">
      {/* <MainHeader /> */}
      <div className="flex flex-col flex-1 bg-white mt-18">{children}</div>
    </main>
  );
});

MainLayout.displayName = 'MainLayout';
