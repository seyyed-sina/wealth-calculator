'use client';
import { memo, PropsWithChildren } from 'react';

import { Button, LucidIcon } from '@components';
import { useStore } from '@hooks';

interface FormStepNavigationProps extends PropsWithChildren {
  onPrev?: () => void;
}

export const FormStepNavigation = memo(
  ({ children, onPrev }: FormStepNavigationProps) => {
    const steps = useStore((state) => state.steps);
    const decrementCurrentStep = useStore((state) => state.onPrev);
    const currentStep = useStore((state) => state.currentStep);

    const nextStepTitle =
      currentStep === steps.length - 1
        ? null
        : steps[Math.min(currentStep + 1)].name;

    const prevStepTitle =
      currentStep === 0 ? null : steps[currentStep - 1].name;

    return (
      <div className="py-4 fixed bottom-0 inset-x-0 z-20 w-full bg-primary-50">
        <div className="container max-w-2xl flex justify-between items-end">
          {currentStep !== 0 && (
            <Button
              size="small"
              variant="white"
              className="flex items-center gap-2"
              onClick={onPrev || decrementCurrentStep}>
              <LucidIcon name="chevron-right" className="size-6" />
              {prevStepTitle && (
                <span className="leading-none">{prevStepTitle}</span>
              )}
            </Button>
          )}
          {children}
          {currentStep !== steps.length - 1 && (
            <Button
              type="submit"
              size="small"
              variant="white"
              className="flex items-center gap-2">
              {nextStepTitle && (
                <span className="leading-none">{nextStepTitle}</span>
              )}
              <LucidIcon name="chevron-left" className="size-6" />
            </Button>
          )}
        </div>
      </div>
    );
  },
);

FormStepNavigation.displayName = 'FormStepNavigation';
