import { memo, PropsWithChildren } from 'react';

import { clx } from '@utils';

interface Props extends PropsWithChildren {
  className?: string;
}

export const PageHeader = memo(({ children, className }: Props) => {
  return (
    <header
      className={clx(
        'fixed top-0 inset-x-0 w-full z-10 h-18 border-b border-solid border-b-gray-200',
        className,
      )}>
      <div className="container max-w-2xl relative flex items-center justify-center text-center font-medium text-base h-full">
        {children}
      </div>
    </header>
  );
});

PageHeader.displayName = 'PageHeader';
