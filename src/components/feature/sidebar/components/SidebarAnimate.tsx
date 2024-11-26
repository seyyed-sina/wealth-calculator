'use client';
import { useLayoutEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import { Sidebar } from '@components';
import { useStore } from '@hooks';

export const SidebarAnimate = () => {
  const pathname = usePathname();
  const isOpenSidebar = useStore(useShallow((state) => state.isOpenSidebar));
  const closeSidebar = useStore(useShallow((state) => state.closeSidebar));

  useLayoutEffect(() => {
    if (isOpenSidebar) closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
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
  );
};

SidebarAnimate.displayName = 'SidebarAnimate';
