import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createAssetSlice } from './asset/asset.slice';
import { Asset } from './asset/asset.type';
import { createExpenseSlice } from './expense/expense.slice';
import { Expense } from './expense/expense.type';
import { createFormStepSlice } from './form-step/form-step.slice';
import { FormStepper } from './form-step/form-step.types';

type StoreState = Asset & Expense & FormStepper;

export const useStore = create(
  devtools<StoreState>((...arg) => ({
    ...createAssetSlice(...arg),
    ...createExpenseSlice(...arg),
    ...createFormStepSlice(...arg),
  })),
);
