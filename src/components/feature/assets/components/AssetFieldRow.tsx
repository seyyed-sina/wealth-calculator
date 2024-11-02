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
import { assetsPlaceholders } from '../assets.data';

interface AssetFieldRowProps {
  index: number;
  onRemove?: () => void;
}

export const AssetFieldRow = memo(({ onRemove, index }: AssetFieldRowProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  console.log('errors: ', errors);

  return (
    <div className="flex items-end flex-wrap gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 grow">
        <FormField label="عنوان دارایی" inputId={`assets.${index}.title`}>
          <input
            {...register(`assets.${index}.title`)}
            type="text"
            id={`assets.${index}.title`}
            placeholder={getPlaceholderByIndex(assetsPlaceholders, index)}
            className="w-full inputbox"
          />
        </FormField>
        <FormField label="مقدار" inputId={`assets.${index}.value`}>
          <FormattedInputControl
            name={`assets.${index}.value`}
            id={`assets.${index}.value`}
            className="flex-1 inputbox"
            currencyUnit="تومان"
            aria-placeholder="مبلغ دارایی"
          />
          {errors.assets?.[index]?.value?.message && (
            <FormValidation error={errors.assets?.[index]?.value?.message} />
          )}
        </FormField>
      </div>
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
  );
});

AssetFieldRow.displayName = 'AssetFieldRow';
