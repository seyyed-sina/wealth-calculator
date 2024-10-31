import { HTMLAttributes, memo } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { clx, formatNumberWithCommas } from '@utils';

interface FormattedInputControlProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  inputClassName?: string;
  currencyUnit?: string;
}

export const FormattedInputControl = memo(
  ({ name, ...rest }: FormattedInputControlProps) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <div className={clx('flex !p-0 overflow-hidden', rest.className)}>
            <input
              type="text"
              {...rest}
              className={clx(
                'flex-1 bg-transparent px-3 outline-0 shrink-0',
                rest.inputClassName,
              )}
              inputMode="numeric"
              value={formatNumberWithCommas(value)}
              onChange={(e) => onChange(formatNumberWithCommas(e.target.value))}
            />
            {rest.currencyUnit && (
              <span className="shrink-0 bg-gray-200 mr-auto text-gray-500 px-3 text-xs inline-flex items-center justify-center text-center">
                {rest.currencyUnit}
              </span>
            )}
          </div>
        )}
      />
    );
  },
);

FormattedInputControl.displayName = 'FormattedInputControl';
