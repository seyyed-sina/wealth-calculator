'use client';
import { memo, useMemo } from 'react';

import { SupabaseUser } from '@supabase/supabase-js';
import { StaticImageData } from 'next/image';
import { useShallow } from 'zustand/shallow';

import { LucidIcon, NextImage, UserDropdownAnimate } from '@components';
import { useStore } from '@hooks';
import { clx, initialAvatar } from '@utils';

interface UserAvatarProps extends Omit<StaticImageData, 'src'> {
  user: SupabaseUser | null;
  userName: string
}

export const UserAvatar = memo(({ user, userName, ...imageProps }: UserAvatarProps) => {
  const userMeta = user?.user_metadata;
  const avatar_url = userMeta?.avatar_url ?? '';
  // const userName = userMeta?.full_name ?? '';

  const toggleDropdown = useStore(useShallow((state) => state.toggleDropdown));
  const isOpenDropdown = useStore(useShallow((state) => state.isOpenDropdown));

  const userAvatar = useMemo(() => {
    if (avatar_url) {
      return (
        <NextImage
          src={avatar_url}
          {...imageProps}
          alt={userName}
          className="rounded-full size-full object-cover"
        />
      );
    } else if (avatar_url === '' && userName) {
      return (
        <span
          tabIndex={0}
          aria-label={userName}
          className="text-white bg-primary-300 font-bold text-base rounded-full size-full flex items-center justify-center text-center">
          {initialAvatar(userName)}
        </span>
      );
    }

    return (
      <span
        tabIndex={0}
        aria-label={userName}
        className="text-primary-800 bg-primary-100 rounded-full size-full flex items-center justify-center text-center">
        <LucidIcon name="user" className="size-6" />
      </span>
    );
  }, [userName, avatar_url, imageProps]);

  return (
    <>
      <div
        role="button"
        className={clx(
          'cursor-pointer flex items-center gap-1 shrink-0 relative hover:bg-primary-50 rounded-lg px-2 py-1 transition-colors',
          isOpenDropdown && 'bg-primary-50',
        )}
        onKeyDown={toggleDropdown}
        onClick={toggleDropdown}>
        <div className="size-8 rounded-full shrink-0">{userAvatar}</div>
        <LucidIcon
          name="chevron-down"
          className={clx(
            'shrink-0 size-5 transition-transform',
            isOpenDropdown && 'rotate-180',
          )}
        />
      </div>
      <UserDropdownAnimate user={user} />
    </>
  );
});

UserAvatar.displayName = 'UserAvatar';
