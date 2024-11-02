import { memo } from 'react';

import { Button, LucidIcon } from '@components';
import { useStore } from '@hooks';

interface FormStepNavigationProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export const FormStepNavigation = memo(
  ({ onNext, onPrev }: FormStepNavigationProps) => {
    const steps = useStore((state) => state.steps);
    const decrementCurrentStep = useStore((state) => state.onPrev);
    const incrementCurrentStep = useStore((state) => state.onNext);
    const currentStep = useStore((state) => state.currentStep);

    const nextStepTitle =
      currentStep === steps.length - 1
        ? null
        : steps[Math.min(currentStep + 1)].name;

    const prevStepTitle =
      currentStep === 0 ? null : steps[currentStep - 1].name;

    return (
      <div className="flex justify-between container max-w-2xl py-5 fixed bottom-0 inset-x-0 w-full">
        {currentStep !== 0 && (
          <Button
            size="small"
            variant="border-primary"
            className="flex items-center gap-2"
            onClick={onPrev || decrementCurrentStep}>
            <LucidIcon name="chevron-right" className="size-6" />
            {prevStepTitle && (
              <span className="leading-none">{prevStepTitle}</span>
            )}
          </Button>
        )}
        {currentStep !== steps.length - 1 && (
          <Button
            type="submit"
            size="small"
            variant="border-primary"
            className="flex items-center gap-2 mr-auto"
            onClick={onNext || incrementCurrentStep}>
            {nextStepTitle && (
              <span className="leading-none">{nextStepTitle}</span>
            )}
            <LucidIcon name="chevron-left" className="size-6" />
          </Button>
        )}
      </div>
    );
  },
);

FormStepNavigation.displayName = 'FormStepNavigation';
