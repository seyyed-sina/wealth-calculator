import { memo } from 'react';

import { LucidIcon } from '@components';
import { clx } from '@utils';

interface ImageErrorProps {
  className?: string;
}

export const ImageError = memo(({ className }: ImageErrorProps) => {
  return (
    <span
      className={clx(
        'flex size-full items-center justify-center bg-gray-50 text-gray-800',
        className,
      )}>
      <LucidIcon name="image-off" className="size-6" />
    </span>
  );
});

ImageError.displayName = 'ImageError';
