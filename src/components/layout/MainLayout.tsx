'use client';
import { memo, PropsWithChildren, useLayoutEffect } from 'react';

import { User } from '@supabase/supabase-js';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { AppProgressBar } from 'next-nprogress-bar';
import { Toaster } from 'sonner';

import { LucidIcon, MainHeader, Sidebar } from '@components';
import { colorValue } from '@constants';
import { useStore } from '@hooks';

type MainLayoutProps = PropsWithChildren

export const MainLayout = memo(({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  const isOpenSidebar = useStore((state) => state.isOpenSidebar);
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const closeSidebar = useStore((state) => state.closeSidebar);

  useLayoutEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

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
      <div className="flex flex-col flex-1 bg-white mt-18 min-h-[calc(100dvh-76px)] overflow-y-auto overflow-x-hidden scrollbar-none container max-w-2xl">
        {children}
      </div>
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
      <AppProgressBar
        height="3px"
        color={colorValue.primary.DEFAULT}
        options={{ showSpinner: false }}
        shallowRouting
        startPosition={10}
      />
      <Toaster
        dir="rtl"
        position="top-center"
        visibleToasts={1}
        icons={{
          error: <LucidIcon name="info" className="size-5" strokeWidth={2} />,
          success: (
            <LucidIcon name="circle-check" className="size-5" strokeWidth={2} />
          ),
        }}
        toastOptions={{
          classNames: {
            default: 'p-3 min-h-13 text-[13px] !font-vazir !font-normal',
            error: 'bg-red text-white',
            success: 'bg-green text-white',
          },
        }}
      />
    </main>
  );
});

MainLayout.displayName = 'MainLayout';
