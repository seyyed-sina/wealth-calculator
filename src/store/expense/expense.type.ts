export interface ExpenseState {
  expenses: { title: string; value: string }[];
  totalExpenses: number;
}

export interface ExpenseAction {
  setExpenses: (expenses: { title: string; value: string }[]) => void;
  setTotalExpenses: (totalExpense: number) => void;
  resetExpenses: () => void;
}

export type Expense = ExpenseState & ExpenseAction;
