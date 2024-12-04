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
    <QueryClientProvider client={queryClient}>
      {children}
      <AppProgressBar
        height="3px"
        color={colorValue.primary.DEFAULT}
        options={{ showSpinner: false }}
        shallowRouting
        startPosition={10}
      />
      <Toaster
        dir="rtl"
        position="top-right"
        visibleToasts={1}
        icons={{
          error: <LucidIcon name="info" size={20} strokeWidth={2} />,
          success: <LucidIcon name="circle-check" size={20} strokeWidth={2} />,
          close: (
            <LucidIcon
              name="x"
              className="size-4 shrink-0 text-gray-400"
              strokeWidth={2}
            />
          ),
        }}
        expand
        toastOptions={{
          classNames: {
            icon: 'shrink-0 mt-[5px] self-baseline',
            default:
              'p-3 min-h-13 text-[13px] !font-vazir !font-normal border-r-4 border-solid',
            error: 'border-r-red text-red',
            success: 'border-r-green text-green',
            closeButton:
              'absolute right-auto -left-4 size-6 !border-none shadow-md',
          },
          closeButton: true,
          duration: Infinity,
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
    </QueryClientProvider>
  );
});

Providers.displayName = 'Providers';
