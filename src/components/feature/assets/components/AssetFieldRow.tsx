'use client';
import { memo } from 'react';

import { useFormContext } from 'react-hook-form';

import { Button, FormattedInputControl, LucidIcon } from '@components';

interface AssetFieldRowProps {
  index: number;
  onAdd: () => void;
  onRemove?: () => void;
}

export const AssetFieldRow = memo(
  ({ onAdd, onRemove, index }: AssetFieldRowProps) => {
    const { register } = useFormContext();

    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1">
          <input
            {...register(`assets.${index}.name`)}
            type="text"
            placeholder="عنوان دارایی"
            className="flex-1 inputbox"
          />
          <FormattedInputControl
            name={`assets.${index}.value`}
            className="flex-1 inputbox"
            currencyUnit="تومان"
            aria-placeholder="مبلغ دارایی"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="submit"
            size="small"
            variant="green"
            className="gap-2"
            aria-label="Add new asset"
            onClick={onAdd}>
            <LucidIcon
              name="plus"
              strokeWidth={2}
              className="size-5 shrink-0"
            />
            اضافه کردن
          </Button>
          {onRemove && (
            <Button
              variant="red"
              size="small"
              className="gap-2"
              aria-label="Remove asset"
              onClick={onRemove}>
              <LucidIcon name="x" strokeWidth={2} className="size-5 shrink-0" />
              حذف کردن
            </Button>
          )}
        </div>
      </div>
    );
  },
);

AssetFieldRow.displayName = 'AssetFieldRow';
