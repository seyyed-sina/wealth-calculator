'use client';
import { Assets, Calculation, Expenses, FormStepHeader } from '@components';
import { useStore } from '@hooks';

export const FormStepProvider = () => {
  const steps = useStore((state) => state.steps);
  const currentStep = useStore((state) => state.currentStep);

  return (
    <div className="container max-w-2xl py-8">
      <div className="flex flex-col h-full overflow-hidden">
        <FormStepHeader />

        {steps.map(
          (step) =>
            currentStep === step.id && (
              <div key={step.id}>
                {step.id === 0 && <Assets />}
                {step.id === 1 && <Expenses />}
                {step.id === 2 && <Calculation />}
              </div>
            ),
        )}
      </div>
    </div>
  );
};

FormStepProvider.displayName = 'FormStepProvider';
