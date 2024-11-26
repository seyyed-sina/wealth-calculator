'use client';
import { memo, useLayoutEffect, useMemo } from 'react';

import { AnimatePresence } from 'framer-motion';
import { StaticImageData } from 'next/image';
import { usePathname } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import { LucidIcon, NextImage, UserDropdownAnimate } from '@components';
import { useStore } from '@hooks';
import { clx, initialAvatar } from '@utils';

import { Profile } from '../../profile/profile.types';

interface UserAvatarProps extends Omit<StaticImageData, 'src'> {
  user: Profile;
}

export const UserAvatar = memo(({ user, ...imageProps }: UserAvatarProps) => {
  const pathname = usePathname();
  const userMeta = user?.user_metadata;
  const avatar_url = user.profile_image ?? userMeta?.avatar_url;
  const userName = user.full_name ?? userMeta?.full_name;

  const closeDropdown = useStore(useShallow((state) => state.closeDropdown));
  const toggleDropdown = useStore(useShallow((state) => state.toggleDropdown));
  const isOpenDropdown = useStore(useShallow((state) => state.isOpenDropdown));

  useLayoutEffect(() => {
    if (isOpenDropdown) closeDropdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
      <AnimatePresence initial={false}>
        {isOpenDropdown && user && <UserDropdownAnimate user={user} />}
      </AnimatePresence>
    </>
  );
});

UserAvatar.displayName = 'UserAvatar';
