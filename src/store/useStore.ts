import { create } from 'zustand';

import { createAssetSlice } from './asset/asset.slice';
import { Asset } from './asset/asset.type';
import { createExpenseSlice } from './expense/expense.slice';
import { Expense } from './expense/expense.type';

type StoreState = Asset & Expense;

export const useStore = create<StoreState>((...arg) => ({
  ...createAssetSlice(...arg),
  ...createExpenseSlice(...arg),
}));
