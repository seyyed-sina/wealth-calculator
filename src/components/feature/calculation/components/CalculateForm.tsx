'use client';
import { FormProvider, useForm } from 'react-hook-form';

import { CalculateTotal, FormattedInputControl, FormField } from '@components';

import { CalculateForm as ICalculateForm } from '../calculation.types';

export const CalculateForm = () => {
  const formMethods = useForm<ICalculateForm>({
    defaultValues: {
      pureAsset: '',
    },
  });

  return (
    <FormProvider {...formMethods}>
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={formMethods.handleSubmit(() => {})}>
        <FormField
          label="مال مخمس (مال خمس داده شده سال قبل)"
          inputId="pureAsset">
          <FormattedInputControl
            name="pureAsset"
            id="pureAsset"
            currencyUnit="تومان"
            className="inputbox w-full"
            aria-placeholder="مقدار"
          />
        </FormField>
        <CalculateTotal />
      </form>
    </FormProvider>
  );
};

CalculateForm.displayName = 'CalculateForm';
