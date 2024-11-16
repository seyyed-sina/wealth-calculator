'use client';;
import { useShallow } from 'zustand/shallow';

import { Button, LucidIcon } from '@components';
import { useStore } from '@hooks';

export const MainHeaderSidebarToggle = () => {
  const toggleSidebar = useStore(useShallow((state) => state.toggleSidebar));

  return (
    <Button
      variant="empty"
      className="absolute right-2 size-10"
      onClick={toggleSidebar}>
      <LucidIcon name="menu" className="size-6" />
    </Button>
  );
};

MainHeaderSidebarToggle.displayName = 'MainHeaderSidebarToggle';
