import { memo } from 'react';

import { formatNumberWithCommas } from '@utils';

interface AssetTotalProps {
  total: number;
}
export const AssetTotal = memo(({ total }: AssetTotalProps) => {
  return (
    <div className="flex items-center gap-1 border-t border-solid border-t-gray-200 pt-5 mt-5">
      جمع:
      <span className="font-medium">
        {formatNumberWithCommas(total?.toString() ?? '0')}
      </span>
      تومان
    </div>
  );
});

AssetTotal.displayName = 'AssetTotal';
