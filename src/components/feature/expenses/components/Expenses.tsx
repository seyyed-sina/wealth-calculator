import { ExpenseForm, StepSection } from '@components';

export const Expenses = () => {
  return (
    <StepSection title="هزینه ها یا بدهی ها" icon="hand-coins">
      <ExpenseForm />
    </StepSection>
  );
};

Expenses.displayName = 'Expenses';
