'use client';
import { memo, useRef } from 'react';

import Link from 'next/link';
import { useShallow } from 'zustand/shallow';

import { LucidIcon, SignOutButton, UserDropdownItem } from '@components';
import { useOutsideClick, useStore } from '@hooks';

import { Profile } from '../../profile/profile.types';
import { dropdownMenuItems } from '../user.data';

interface UserDropdownProps {
  user: Profile;
}

export const UserDropdown = memo(({ user }: UserDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isOpenDropdown = useStore(useShallow((state) => state.isOpenDropdown));
  const closeDropdown = useStore(useShallow((state) => state.closeDropdown));
  const userMeta = user?.user_metadata;
  const userName = user.full_name ?? userMeta?.full_name;

  useOutsideClick(dropdownRef, () => {
    if (isOpenDropdown) closeDropdown();
  });

  return (
    <div className="flex flex-col rounded-lg bg-white" ref={dropdownRef}>
      <div className="flex flex-col text-right justify-start gap-1 truncate px-4 py-3 bg-primary-50 rounded-t-lg">
        <h3
          className="text-sm font-medium truncate text-gray-800 leading-6"
          title={userName}>
          {userName}
        </h3>
        {user?.email && (
          <span className="text-gray-500 text-xs">{user.email}</span>
        )}
      </div>
      <ul className="flex flex-col px-3 pb-2 rounded-b-lg">
        {dropdownMenuItems.map((item) => (
          <UserDropdownItem key={item.id}>
            <Link href={item.path} className="flex items-center gap-2">
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
