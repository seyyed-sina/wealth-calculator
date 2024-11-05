'use client';
import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import { SidebarItem } from '@components';
import { useStore } from '@hooks';

import { SidebarItems } from '../sidebar.data';

export const Sidebar = () => {
  const pathname = usePathname();
  const closeSidebar = useStore((state) => state.closeSidebar);

  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  return (
    <nav>
      <ul className="flex flex-col">
        {SidebarItems.map((item) => (
          <SidebarItem key={item.title} item={item} />
        ))}
      </ul>
    </nav>
  );
};

Sidebar.displayName = 'Sidebar';
