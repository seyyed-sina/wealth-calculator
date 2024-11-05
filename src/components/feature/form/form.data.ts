import { z } from 'zod';

const sharedSchema = z.object({
  title: z.string(),
  value: z
    .string()
    .min(1, { message: 'لطفا مقدار را وارد کنید' })
    .refine(
      (val) => {
        const num = Number(val.replace(/,/g, ''));
        return !isNaN(num) && num > 0;
      },
      {
        message: 'مقدار باید بزرگتر از صفر باشد',
      },
    ),
});

export const assetSchema = z.object({
  assets: z.array(sharedSchema),
});

export const expenseSchema = z.object({
  expenses: z.array(sharedSchema),
});
