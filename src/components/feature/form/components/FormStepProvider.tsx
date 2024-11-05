'use client';
import { Assets, Calculation, Expenses, FormStepHeader } from '@components';
import { useStore } from '@hooks';

export const FormStepProvider = () => {
  const steps = useStore((state) => state.steps);
  const currentStep = useStore((state) => state.currentStep);

  return (
    <div className="flex flex-col h-full py-8">
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
  );
};

FormStepProvider.displayName = 'FormStepProvider';
