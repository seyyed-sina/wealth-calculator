import { memo } from 'react';

import { useStore } from '@hooks';
import { clx } from '@utils';

interface FormStepHeaderProps {
  //   index: number;
  className?: string;
}

export const FormStepHeader = memo(({ className }: FormStepHeaderProps) => {
  const steps = useStore((state) => state.steps);
  const currentStep = useStore((state) => state.currentStep);

  return (
    <div
      className={clx(
        'flex items-center justify-between relative max-w-sm w-full mx-auto mb-10 after:h-px after:bg-gray-200 after:absolute after:top-2 after:left-6 after:right-6',
        className,
      )}>
      {steps.map((step) => (
        <div
          key={step.id}
          className="flex flex-col items-center gap-2 shrink-0 relative z-10">
          <span
            className={clx(
              'size-4 rounded-full bg-gray-200 flex items-center justify-center shrink-0 transition-colors duration-300',
              currentStep === step.id && 'bg-primary outline-primary',
            )}
          />
          <span
            className={clx(
              ' transition-colors duration-300 text-sm',
              currentStep === step.id && 'text-primary',
            )}>
            {step.name}
          </span>
        </div>
      ))}
    </div>
  );
});
FormStepHeader.displayName = 'FormStepHeader';
