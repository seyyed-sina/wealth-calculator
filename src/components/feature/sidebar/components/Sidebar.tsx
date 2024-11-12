'use client';
import { Button, LucidIcon, SidebarItem, SidebarUser } from '@components';
import { useStore } from '@hooks';

import { SidebarItems } from '../sidebar.data';

export const Sidebar = () => {
  const closeSidebar = useStore((state) => state.closeSidebar);

  return (
    <div className="flex flex-col h-full relative">
      <Button
        variant="empty"
        className="text-white absolute top-4 right-2 size-10"
        onClick={closeSidebar}>
        <LucidIcon name="arrow-right" />
      </Button>
      <div className="h-48 bg-primary-400 w-full flex items-end px-5 py-3">
        <h1 className="text-lg font-medium text-white"> خمس من</h1>
      </div>
      <nav className="grow mt-4">
        <ul className="flex flex-col">
          {SidebarItems.map((item) => (
            <SidebarItem key={item.title} item={item} />
          ))}
        </ul>
        <SidebarUser />
      </nav>
    </div>
  );
};

Sidebar.displayName = 'Sidebar';
