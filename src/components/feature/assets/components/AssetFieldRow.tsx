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

import { assetsPlaceholders } from '../assets.data';
import { AssetFormValues } from '../assets.types';

interface AssetFieldRowProps {
  index: number;
  onRemove?: () => void;
}

export const AssetFieldRow = memo(({ onRemove, index }: AssetFieldRowProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<AssetFormValues>();

  return (
    <div className="flex flex-col xs:flex-row flex-wrap gap-2">
      <FormField label="عنوان دارایی" inputId={`assets.${index}.title`}>
        <input
          {...register(`assets.${index}.title`)}
          type="text"
          id={`assets.${index}.title`}
          placeholder={getPlaceholderByIndex(assetsPlaceholders, index)}
          className="w-full inputbox"
        />
      </FormField>
      <div className="flex flex-1 gap-2 grow">
        <FormField label="مقدار" inputId={`assets.${index}.value`}>
          <FormattedInputControl
            name={`assets.${index}.value`}
            id={`assets.${index}.value`}
            className="flex-1 inputbox"
            currencyUnit="تومان"
            aria-placeholder="مبلغ دارایی"
            aria-invalid={!!errors.assets?.[index]?.value?.message}
          />
          {errors.assets?.[index]?.value?.message && (
            <FormValidation error={errors.assets?.[index]?.value?.message} />
          )}
        </FormField>
        {onRemove && (
          <Button
            variant="red"
            size="small"
            className="gap-2 mt-6"
            aria-label="Remove asset"
            onClick={onRemove}>
            <LucidIcon name="x" strokeWidth={2} className="size-5 shrink-0" />
          </Button>
        )}
      </div>
    </div>
  );
});

AssetFieldRow.displayName = 'AssetFieldRow';
