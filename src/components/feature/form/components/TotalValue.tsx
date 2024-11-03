import { memo } from 'react';

import { useStore } from '@hooks';
import { clx, formatNumberWithCommas } from '@utils';

interface TotalValueProps {
  total: number;
  title?: string;
  className?: string;
}

export const TotalValue = memo(
  ({ total, title = 'مجموع', className }: TotalValueProps) => {
    const currentStep = useStore((state) => state.currentStep);

    return (
      <div
        className={clx(
          'flex flex-col gap-1 text-xs text-gray-500 justify-start',
          currentStep !== 0 && 'text-center items-center justify-center',
          className,
        )}>
        {title}
        <div className="flex items-center gap-0.5 text-gray-800 text-base">
          <span className="font-bold">
            {formatNumberWithCommas(total?.toString() ?? '0')}
          </span>
          تومان
        </div>
      </div>
    );
  },
);

TotalValue.displayName = 'TotalValue';
