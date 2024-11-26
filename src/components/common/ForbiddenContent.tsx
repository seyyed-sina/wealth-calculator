import { memo } from 'react';

import { Button, LucidIcon } from '@components';
import { routes } from '@constants';
import { clx } from '@utils';

interface ForbiddenContentProps  {
  className?: string;
}

export const ForbiddenContent = memo(
  ({ className }: ForbiddenContentProps) => {
    return (
      <div
        className={clx(
          'py-8 flex items-center justify-center text-center gap-6',
          className,
        )}>
        <LucidIcon name="ban" className="size-13" />
        <h3 className="text-2xl font-semibold">
          شما دسترسی به این صفحه را ندارید
        </h3>
        <p className="text-gray-300 text-sm">
          برای مشاهده این صفحه باید وارد شوید
        </p>
        <div className="flex items-center justify-center">
          <Button tag="a" href={routes.SIGN_IN} size="small" label="ورود" />
        </div>
      </div>
    );
  },
);

ForbiddenContent.displayName = 'ForbiddenContent';
