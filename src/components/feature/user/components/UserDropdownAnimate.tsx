import { memo } from 'react';

import { motion } from 'framer-motion';

import { UserDropdown } from '@components';
import { userDropdownVariant } from '@constants';

import { Profile } from '../../profile/profile.types';

interface UserDropdownAnimateProps {
  user: Profile;
}

export const UserDropdownAnimate = memo(
  ({ user }: UserDropdownAnimateProps) => {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={userDropdownVariant}
        className="absolute top-11 left-0 z-20 min-w-52 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
        <UserDropdown user={user} />
      </motion.div>
    );
  },
);

UserDropdownAnimate.displayName = 'UserDropdownAnimate';
