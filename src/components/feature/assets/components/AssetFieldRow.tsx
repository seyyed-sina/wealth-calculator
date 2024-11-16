'use client';
import { memo } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { Button, FormField, FormValidation, LucidIcon } from '@components';
import { clx, formatNumberWithCommas, getPlaceholderByIndex } from '@utils';

import { assetsPlaceholders } from '../assets.data';
import { AssetFormValues } from '../assets.types';

interface AssetFieldRowProps {
  index: number;
  onRemove?: () => void;
}

export const AssetFieldRow = memo(({ onRemove, index }: AssetFieldRowProps) => {
  const {
    control,
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
          {/* <FormattedInputControl
            name={`assets.${index}.value`}
            id={`assets.${index}.value`}
            className="flex-1 inputbox"
            currencyUnit="تومان"
            aria-placeholder="مبلغ دارایی"
            aria-invalid={!!errors.assets?.[index]?.value?.message}
          /> */}
          <Controller
            name={`assets.${index}.value`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className={clx('flex !p-0 overflow-hidden flex-1 inputbox')}>
                <input
                  type="text"
                  id={`assets.${index}.value`}
                  aria-placeholder="مبلغ دارایی"
                  className={clx('flex-1 bg-transparent px-3 outline-0 w-full')}
                  aria-invalid={!!errors.assets?.[index]?.value?.message}
                  inputMode="numeric"
                  value={formatNumberWithCommas(value)}
                  onChange={(e) =>
                    onChange(formatNumberWithCommas(e.target.value))
                  }
                />
                <span className="shrink-0 bg-gray-100 mr-auto text-gray-500 px-3 text-xs inline-flex items-center justify-center text-center">
                  تومان
                </span>
              </div>
            )}
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
