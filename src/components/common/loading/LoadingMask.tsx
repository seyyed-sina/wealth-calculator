import { FC, HTMLAttributes } from 'react';

import { clx } from '@utils';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  hasAnimate?: boolean;
}

export const LoadingMask: FC<Props> = ({ hasAnimate = true, className }) => {
  return (
    <span
      className={clx(
        'rounded-lg bg-gray-100 block',
        hasAnimate && 'animate-pulse',
        className,
      )}
    />
  );
};

LoadingMask.displayName = 'LoadingMask';
