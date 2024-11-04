'use client';
import { memo, PropsWithChildren } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { MainHeader, Sidebar } from '@components';
import { useStore } from '@hooks';

type MainLayoutProps = PropsWithChildren;

export const MainLayout = memo(({ children }: MainLayoutProps) => {
  const isOpenSidebar = useStore((state) => state.isOpenSidebar);
  console.log('isOpenSidebar: ', isOpenSidebar);
  // const shouldRenderSidebar = useDelayUnmount(isOpenSidebar, 300);
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  return (
    <main className="flex flex-col min-h-dvh">
      <MainHeader />
      <AnimatePresence initial={false}>
        {isOpenSidebar && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-md z-50">
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col flex-1 bg-white mt-18">{children}</div>
      <AnimatePresence initial={false}>
        {isOpenSidebar && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-[1px]"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
    </main>
  );
});

MainLayout.displayName = 'MainLayout';
