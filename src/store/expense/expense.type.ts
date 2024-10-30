export interface ExpenseState {
  expenses: { title: string; value: string }[];
}

export interface ExpenseAction {
  setExpenses: (expenses: { title: string; value: string }[]) => void;
  resetExpenses: () => void;
}

export type Expense = ExpenseState & ExpenseAction;
