import { FC, memo } from 'react';

import { LucidIcon } from '@components';
import { clx } from '@utils';

interface Props {
  title: string;
  className?: string;
  onClose: () => void;
}
export const BottomSheetHeader: FC<Props> = memo(
  ({ title, className, onClose }) => {
    return (
      <div
        className={clx(
          'flex items-center bg-white dark:bg-gray-600 gap-1 py-7 px-4',
          className,
        )}>
        <h5 className="font-bold text-base grow text-black dark:text-white">
          {title}
        </h5>
        <span
          role="button"
          className="rounded-full size-6 flex items-center justify-center text-center rtl:mr-auto ltr:ml-auto shrink-0"
          onKeyDown={onClose}
          onClick={onClose}>
          <LucidIcon name="x-circle" className="size-full text-primary" />
        </span>
      </div>
    );
  },
);

BottomSheetHeader.displayName = 'BottomSheetHeader';
