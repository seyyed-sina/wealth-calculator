'use client';
import { CalculateForm, FormStepNavigation, StepSection } from '@components';
import { useStore } from '@hooks';

export const Calculation = () => {
  const totalAssets = useStore((state) => state.totalAssets);
  const totalExpenses = useStore((state) => state.totalExpenses);
  const difference = totalAssets - totalExpenses;

  return (
    <StepSection title="محاسبات" icon="calculator">
      {difference <= 0 && <span>خمسی به شما تعلق نمی گیرد</span>}
      {difference > 0 && <CalculateForm />}
      <FormStepNavigation />
    </StepSection>
  );
};

Calculation.displayName = 'Calculation';
