import { memo, PropsWithChildren } from 'react';

import { clx } from '@utils';

interface FormFieldProps extends PropsWithChildren {
  label: string;
  inputId: string;
  className?: string;
  required?: boolean;
}

export const FormField = memo(
  ({ children, label, inputId, required, className }: FormFieldProps) => {
    return (
      <div className={clx('flex flex-col gap-1 flex-1', className)}>
        <label htmlFor={inputId} className="text-sm flex items-center gap-1">
          {label}
          {required && <span className="text-xs">(الزامی)</span>}
        </label>
        {children}
      </div>
    );
  },
);

FormField.displayName = 'FormField';
