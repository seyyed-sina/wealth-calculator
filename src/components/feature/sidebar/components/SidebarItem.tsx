'use client';
import { memo } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LucidIcon } from '@components';
import { clx } from '@utils';

import { SidebarItem as ISidebarItem } from '../sidebar.type';

interface SidebarItemProps {
  item: ISidebarItem;
}

export const SidebarItem = memo(({ item }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <li>
      <Link
        href={item.href}
        className={clx(
          'flex items-center gap-3 text-gray-700 hover:bg-gray-50 size-full px-4 py-3 min-h-11 transition-colors duration-300',
          isActive && 'bg-gray-50 text-primary',
        )}>
        <LucidIcon name={item.icon} className="size-6" />
        <h3 className={clx('font-normal text-sm', isActive && 'font-medium')}>
          {item.title}
        </h3>
      </Link>
    </li>
  );
});

SidebarItem.displayName = 'SidebarItem';
