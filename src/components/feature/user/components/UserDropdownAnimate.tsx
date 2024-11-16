'use client';
import { memo } from 'react';

import { SupabaseUser } from '@supabase/supabase-js';
import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';

import { UserDropdown } from '@components';
import { userDropdownVariant } from '@constants';
import { useStore } from '@hooks';

interface UserDropdownAnimateProps {
  user: SupabaseUser | null;
}

export const UserDropdownAnimate = memo(
  ({ user }: UserDropdownAnimateProps) => {
    const isOpenDropdown = useStore(
      useShallow((state) => state.isOpenDropdown),
    );

    return (
      <AnimatePresence initial={false}>
        {isOpenDropdown && user && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={userDropdownVariant}
            className="absolute top-11 left-0 z-20 min-w-52 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
            <UserDropdown user={user} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

UserDropdownAnimate.displayName = 'UserDropdownAnimate';
