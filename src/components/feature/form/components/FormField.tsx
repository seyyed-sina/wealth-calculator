import { memo, PropsWithChildren } from 'react';

import { clx } from '@utils';

interface FormFieldProps extends PropsWithChildren {
  label: string;
  inputId: string;
  className?: string;
}

export const FormField = memo(
  ({ children, label, inputId, className }: FormFieldProps) => {
    return (
      <div className={clx('flex flex-col gap-1 flex-1', className)}>
        <label htmlFor={inputId} className="text-sm">
          {label}
        </label>
        {children}
      </div>
    );
  },
);

FormField.displayName = 'FormField';
