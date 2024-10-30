import { ExpenseForm } from '@components';

export const Expenses = () => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-6">هزینه ها (مخارج)</h2>
      <ExpenseForm />
    </div>
  );
};

Expenses.displayName = 'Expenses';
