'use client';
import { useFormContext, useWatch } from 'react-hook-form';

import { useStore } from '@hooks';
import { formatNumberWithCommas } from '@utils';

import { CalculateForm as ICalculateForm } from '../calculation.types';

export const CalculateTotal = () => {
  const totalAssets = useStore((state) => state.totalAssets);
  const totalExpenses = useStore((state) => state.totalExpenses);

  const { control } = useFormContext<ICalculateForm>();

  const pureAsset = useWatch({
    control,
    name: 'pureAsset',
  });
  const parsedPureAsset = Number(pureAsset.replace(/,/g, ''));

  const assetExpenseDifference = totalAssets - totalExpenses;
  let calculatedNetProfit = 0;
  let annualPortion = 0;

  if (assetExpenseDifference > parsedPureAsset) {
    calculatedNetProfit = assetExpenseDifference - parsedPureAsset;
    annualPortion = calculatedNetProfit / 5;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-1">
        <span>اختلاف هزینه و درآمد:</span>
        <span className="font-bold">
          {formatNumberWithCommas(assetExpenseDifference.toString())} تومان
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span>میزان خمس امسال:</span>
        <span className="font-bold text-xl">
          {formatNumberWithCommas(annualPortion.toString())} تومان
        </span>
      </div>
    </div>
  );
};

CalculateTotal.displayName = 'CalculateTotal';
