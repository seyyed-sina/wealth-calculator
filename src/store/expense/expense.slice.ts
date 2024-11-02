import { StateCreator } from 'zustand';

import { Expense, ExpenseState } from './expense.type';

const initialState: ExpenseState = {
  expenses: [],
  totalExpenses: 0,
};

export const createExpenseSlice: StateCreator<Expense> = (set) => ({
  ...initialState,
  setExpenses: (Expenses: { title: string; value: string }[]) => {
    set((state) => ({ ...state, Expenses }));
  },
  setTotalExpenses: (totalExpenses: number) => {
    set((state) => ({ ...state, totalExpenses }));
  },
  resetExpenses: () => set({ ...initialState }),
});
