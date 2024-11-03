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

import { expensesPlaceholders } from '../expenses.data';
import { ExpenseFormValues } from '../expenses.types';

interface ExpenseFieldRowProps {
  index: number;
  onRemove?: () => void;
}

export const ExpenseFieldRow = memo(
  ({ onRemove, index }: ExpenseFieldRowProps) => {
    const {
      register,
      formState: { errors },
    } = useFormContext<ExpenseFormValues>();

    return (
      <div className="flex flex-col xs:flex-row flex-wrap gap-2">
        <FormField label="عنوان هزینه" inputId={`expenses.${index}.title`}>
          <input
            {...register(`expenses.${index}.title`)}
            type="text"
            id={`expenses.${index}.title`}
            placeholder={getPlaceholderByIndex(expensesPlaceholders, index)}
            className="inputbox w-full"
          />
        </FormField>
        <div className="flex flex-1 gap-2 grow">
          <FormField label="مقدار" inputId={`expenses.${index}.value`}>
            <FormattedInputControl
              name={`expenses.${index}.value`}
              id={`expenses.${index}.value`}
              className="w-full inputbox"
              currencyUnit="تومان"
              aria-placeholder="مقدار هزینه"
              aria-invalid={!!errors.expenses?.[index]?.value?.message}
            />
            {errors?.expenses?.[index]?.value?.message && (
              <FormValidation
                error={errors?.expenses?.[index]?.value?.message}
              />
            )}
          </FormField>
          {onRemove && (
            <Button
              variant="red"
              size="small"
              className="gap-2 mt-6"
              aria-label="Remove expense"
              onClick={onRemove}>
              <LucidIcon name="x" strokeWidth={2} className="size-5 shrink-0" />
            </Button>
          )}
        </div>
      </div>
    );
  },
);

ExpenseFieldRow.displayName = 'ExpenseFieldRow';
