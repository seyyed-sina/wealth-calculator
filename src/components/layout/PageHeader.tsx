import { memo, PropsWithChildren } from 'react';

import { clx } from '@utils';

interface Props extends PropsWithChildren {
  className?: string;
}

export const PageHeader = memo(({ children, className }: Props) => {
  return (
    <header
      className={clx(
        'flex items-center justify-center text-center p-4 font-medium text-base fixed top-0 inset-x-0 w-full z-10 h-18 border-b border-solid border-b-gray-200',
        className,
      )}>
      {children}
    </header>
  );
});

PageHeader.displayName = 'PageHeader';
