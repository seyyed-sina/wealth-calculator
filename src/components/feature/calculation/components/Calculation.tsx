'use client';
import { CalculateForm } from '@components';
import { useStore } from '@hooks';

export const Calculation = () => {
  const totalAssets = useStore((state) => state.totalAssets);
  const totalExpenses = useStore((state) => state.totalExpenses);
  const difference = totalAssets - totalExpenses;

  return (
    <section>
      <h2 className="text-xl font-medium mb-6">محاسبات</h2>
      {difference <= 0 && <span>خمسی به شما تعلق نمی گیرد</span>}
      {difference > 0 && <CalculateForm />}
    </section>
  );
};

Calculation.displayName = 'Calculation';
