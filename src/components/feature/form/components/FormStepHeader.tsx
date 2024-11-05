'use client';
import { memo } from 'react';

import { motion } from 'framer-motion';

import { useStore } from '@hooks';
import { clx } from '@utils';

interface FormStepHeaderProps {
  className?: string;
}

export const FormStepHeader = memo(({ className }: FormStepHeaderProps) => {
  const steps = useStore((state) => state.steps);
  const currentStep = useStore((state) => state.currentStep);

  const segmentWidth = 100 / (steps.length - 1);
  const progressWidth = `${segmentWidth * currentStep}%`;
  const finalWidth = `calc(${progressWidth} - 48px)`;
  const halfWidth = `calc(${progressWidth} - 24px)`;

  return (
    <div
      className={clx(
        'flex items-center justify-between relative max-w-sm w-full mx-auto mb-10 after:h-px after:bg-gray-100 after:absolute after:top-2 after:left-6 after:right-6',
        className,
      )}>
      <motion.div
        className="absolute top-2 right-6 h-px z-10 bg-primary"
        initial={{ width: 0 }}
        animate={{ width: progressWidth === '100%' ? finalWidth : halfWidth }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      />
      {steps.map((step) => (
        <div
          key={step.id}
          className="flex flex-col items-center gap-2 shrink-0 relative z-10">
          <span
            className={clx(
              'size-4 rounded-full bg-gray-100 flex items-center justify-center shrink-0 transition-colors duration-500',
              +step.id <= currentStep && 'bg-primary',
            )}
          />
          <span
            className={clx(
              'transition-colors duration-100 text-sm text-gray-400 font-medium',
              +step.id <= currentStep && 'text-primary',
            )}>
            {step.name}
          </span>
        </div>
      ))}
    </div>
  );
});
FormStepHeader.displayName = 'FormStepHeader';
