'use client';
import { FormProvider, useForm } from 'react-hook-form';

import { CalculateTotal, FormattedInputControl } from '@components';

import { CalculateForm as ICalculateForm } from '../calculation.types';

export const CalculateForm = () => {
  const formMethods = useForm<ICalculateForm>({
    defaultValues: {
      pureAsset: '',
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit((data) => console.log(data))}>
          <div className="flex items-center gap-4">
            <label htmlFor="pureAsset">خالص دارایی</label>
            <FormattedInputControl
              name="pureAsset"
              id="pureAsset"
              currencyUnit="تومان"
              className="inputbox"
              aria-placeholder="مقدار"
            />
          </div>
        </form>
        <CalculateTotal />
      </FormProvider>
    </div>
  );
};

CalculateForm.displayName = 'CalculateForm';
