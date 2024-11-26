import { memo } from 'react';

import { clx } from '@utils';

interface FormValidationProps {
  className?: string;
  error: string;
}

export const FormValidation = memo(
  ({ className, error }: FormValidationProps) => {
    return (
      <span className={clx('text-red text-xs mt-1', className)}>{error}</span>
    );
  },
);

FormValidation.displayName = 'FormValidation';
