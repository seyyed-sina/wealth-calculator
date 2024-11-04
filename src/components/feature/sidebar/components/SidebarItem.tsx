import { memo } from 'react';

import Link from 'next/link';

import { LucidIcon } from '@components';

import { SidebarItem as ISidebarItem } from '../sidebar.type';

interface SidebarItemProps {
  item: ISidebarItem;
}

export const SidebarItem = memo(({ item }: SidebarItemProps) => {
  return (
    <li>
      <Link
        href={item.href}
        className="flex items-center gap-3 hover:text-primary hover:bg-gray-50 size-full 
		px-4 py-3 min-h-11 transition-colors duration-300">
        <LucidIcon name={item.icon} className="size-6" />
        <h3 className="font-medium text-sm">{item.title}</h3>
      </Link>
    </li>
  );
});

SidebarItem.displayName = 'SidebarItem';
