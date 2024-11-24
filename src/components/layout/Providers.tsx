'use client';
import { memo, PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProgressBar } from 'next-nprogress-bar';
import { Toaster } from 'sonner';
import { useShallow } from 'zustand/shallow';

import { LucidIcon } from '@components';
import { colorValue } from '@constants';
import { useStore } from '@hooks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 2 * 60 * 1000, // 2 minutes
    },
  },
});
export const Providers = memo(({ children }: PropsWithChildren) => {
  const isOpenSidebar = useStore(useShallow((state) => state.isOpenSidebar));
  const closeSidebar = useStore(useShallow((state) => state.closeSidebar));

  return (
    <div className="flex flex-col flex-1 bg-white mt-18 min-h-[calc(100dvh-76px)] overflow-y-auto overflow-x-hidden scrollbar-none container max-w-2xl">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
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
      <AnimatePresence initial={false}>
        {isOpenSidebar && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-[1px]"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>
    </div>
  );
});

Providers.displayName = 'Providers';
