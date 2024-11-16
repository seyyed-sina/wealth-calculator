'use client';
import { memo, useLayoutEffect, useRef } from 'react';

import { SupabaseUser } from '@supabase/supabase-js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import { LucidIcon, SignOutButton, UserDropdownItem } from '@components';
import { useOutsideClick, useStore } from '@hooks';

import { dropdownMenuItems } from '../user.data';

interface UserDropdownProps {
  user: SupabaseUser | null;
}

export const UserDropdown = memo(({ user }: UserDropdownProps) => {
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isOpenDropdown = useStore(useShallow((state) => state.isOpenDropdown));
  const toggleDropdown = useStore(useShallow((state) => state.toggleDropdown));
  const userName = user?.user_metadata?.full_name ?? '';

  useOutsideClick(dropdownRef, () => {
    if (isOpenDropdown) toggleDropdown();
  });

  useLayoutEffect(() => {
    if (isOpenDropdown) toggleDropdown();
  }, [pathname, toggleDropdown, isOpenDropdown]);

  return (
    <div className="flex flex-col rounded-lg bg-white" ref={dropdownRef}>
      <div className="flex flex-col text-right justify-start gap-1 truncate px-4 py-3 bg-primary-50 rounded-t-lg">
        <h3
          className="text-sm font-medium truncate text-gray-800 leading-6"
          title={userName}>
          {userName}
        </h3>
        <span className="text-gray-500 text-xs">{user?.email}</span>
      </div>
      <ul className="flex flex-col px-3 pb-2 rounded-b-lg">
        {dropdownMenuItems.map((item) => (
          <UserDropdownItem key={item.id}>
            <Link href={item.path} className="flex items-center w-full gap-2">
              <LucidIcon name={item.icon} className="shrink-0 size-5" />
              {item.label}
            </Link>
          </UserDropdownItem>
        ))}
        <UserDropdownItem>
          <SignOutButton />
        </UserDropdownItem>
      </ul>
    </div>
  );
});

UserDropdown.displayName = 'UserDropdown';
