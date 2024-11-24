'use client';
import { useShallow } from 'zustand/shallow';

import { Button, LucidIcon } from '@components';
import { useStore } from '@hooks';

export const SidebarClose = () => {
  const closeSidebar = useStore(useShallow((state) => state.closeSidebar));

  return (
    <Button
      variant="empty"
      className="text-white size-10 -mr-3 hover:"
      onClick={closeSidebar}>
      <LucidIcon name="arrow-right" />
    </Button>
  );
};

SidebarClose.displayName = 'SidebarClose';
