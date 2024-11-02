'use client';
import { memo } from 'react';

import { useFormContext } from 'react-hook-form';

import {
  Button,
  FormattedInputControl,
  FormField,
  FormValidation,
  LucidIcon,
} from '@components';
import { getPlaceholderByIndex } from '@utils';

import { FormValues } from '../../form/form.type';
import { expensesPlaceholders } from '../expenses.data';

interface ExpenseFieldRowProps {
  index: number;
  onRemove?: () => void;
}

export const ExpenseFieldRow = memo(
  ({ onRemove, index }: ExpenseFieldRowProps) => {
    const {
      register,
      formState: { errors },
    } = useFormContext<FormValues>();

    return (
      <div className="flex items-end flex-wrap gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 grow">
          <FormField label="عنوان هزینه" inputId={`expenses.${index}.title`}>
            <input
              {...register(`expenses.${index}.title`)}
              type="text"
              id={`expenses.${index}.title`}
              placeholder={getPlaceholderByIndex(expensesPlaceholders, index)}
              className="inputbox w-full"
            />
          </FormField>
          <FormField label="مقدار" inputId={`expenses.${index}.value`}>
            <FormattedInputControl
              name={`expenses.${index}.value`}
              id={`expenses.${index}.value`}
              className="w-full inputbox"
              currencyUnit="تومان"
              aria-placeholder="مقدار هزینه"
            />
            {errors?.expenses?.[index]?.value?.message && (
              <FormValidation
                error={errors?.expenses?.[index]?.value?.message}
              />
            )}
          </FormField>
        </div>
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
    );
  },
);

ExpenseFieldRow.displayName = 'ExpenseFieldRow';
