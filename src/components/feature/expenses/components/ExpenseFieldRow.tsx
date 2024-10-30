'use client';
import { memo } from 'react';

import { useFormContext } from 'react-hook-form';

import { Button, FormattedInputControl, LucidIcon } from '@components';

interface ExpenseFieldRowProps {
  index: number;
  onAdd: () => void;
  onRemove?: () => void;
}

export const ExpenseFieldRow = memo(
  ({ onAdd, onRemove, index }: ExpenseFieldRowProps) => {
    const { register } = useFormContext();

    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1">
          <input
            {...register(`expenses.${index}.name`)}
            type="text"
            placeholder="عنوان هزینه"
            className="flex-1 inputbox"
          />{' '}
          <FormattedInputControl
            name={`expenses.${index}.value`}
            className="flex-1 inputbox"
            currencyUnit="تومان"
            aria-placeholder="مقدار هزینه"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="submit"
            size="small"
            variant="green"
            className="gap-2"
            aria-label="Add new expense"
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
              aria-label="Remove expense"
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

ExpenseFieldRow.displayName = 'ExpenseFieldRow';
