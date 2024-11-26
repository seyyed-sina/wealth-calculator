import { FC, memo, PropsWithChildren } from 'react';

import { clx } from '@utils';

interface Props extends PropsWithChildren {
  className?: string;
}

export const BottomSheetFooter: FC<Props> = memo(({ className, children }) => {
  return (
    <div
      className={clx(
        'flex items-center p-4 bg-white dark:bg-gray-600',
        className,
      )}>
      {children}
    </div>
  );
});

BottomSheetFooter.displayName = 'BottomSheetFooter';
