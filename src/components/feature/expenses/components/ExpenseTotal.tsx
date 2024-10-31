import { memo } from 'react';

import { formatNumberWithCommas } from '@utils';

interface ExpenseTotalProps {
  total: number;
}

export const ExpenseTotal = memo(({ total }: ExpenseTotalProps) => {
  return (
    <div className="flex items-center gap-1">
      جمع:
      <span className="font-medium">
        {formatNumberWithCommas(total?.toString() ?? '0')}
      </span>
      تومان
    </div>
  );
});

ExpenseTotal.displayName = 'ExpenseTotal';
