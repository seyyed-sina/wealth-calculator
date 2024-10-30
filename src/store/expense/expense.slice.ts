import { StateCreator } from 'zustand';

import { Expense, ExpenseState } from './expense.type';

const initialState: ExpenseState = {
  expenses: [{ title: '', value: '' }],
};

export const createExpenseSlice: StateCreator<Expense> = (set) => ({
  ...initialState,
  setExpenses: (Expenses: { title: string; value: string }[]) => {
    set((state) => ({ ...state, Expenses }));
  },
  resetExpenses: () => set({ ...initialState }),
});
