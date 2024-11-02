'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence } from 'framer-motion';
import { FormProvider, useForm } from 'react-hook-form';

import { Assets, Calculation, Expenses, FormStepHeader } from '@components';
import { useStore } from '@hooks';

import { formSchema } from '../form.data';
import { FormValues } from '../form.type';

export const FormStepProvider = () => {
  const steps = useStore((state) => state.steps);
  const currentStep = useStore((state) => state.currentStep);
  const expenses = useStore((state) => state.expenses);
  const assets = useStore((state) => state.assets);
  const incrementCurrentStep = useStore((state) => state.onNext);

  const formMethods = useForm<FormValues>({
    defaultValues: {
      expenses,
      assets,
      pureAsset: '',
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="container max-w-2xl py-8">
      <div className="flex flex-col h-full overflow-hidden">
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(incrementCurrentStep)}
            className="relative">
            <FormStepHeader />
            <div className="flex-1 relative overflow-y-auto h-[calc(100dvh-160px-116px)]  overflow-x-hidden scrollbar-none">
              <AnimatePresence initial={false}>
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
              </AnimatePresence>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

FormStepProvider.displayName = 'FormStepProvider';
