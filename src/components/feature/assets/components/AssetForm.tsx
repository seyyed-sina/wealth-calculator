'use client';
import { useCallback, useEffect, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';

import {
  AssetFieldRow,
  Button,
  FormStep,
  FormStepNavigation,
  LucidIcon,
  TotalValue,
} from '@components';
import { useStore } from '@hooks';

import { assetSchema } from '../../form/form.data';
import { AssetFormValues } from '../assets.types';

export const AssetForm = () => {
  const assets = useStore(useShallow((state) => state.assets));
  const setAssets = useStore(useShallow((state) => state.setAssets));
  const setTotalAssets = useStore(useShallow((state) => state.setTotalAssets));
  const incrementCurrentStep = useStore(useShallow((state) => state.onNext));

  const formMethods = useForm<AssetFormValues>({
    defaultValues: {
      assets,
    },
    resolver: zodResolver(assetSchema),
    mode: 'onChange',
  });

  const { control, handleSubmit, getFieldState } = formMethods;

  const { fields, append, remove } = useFieldArray<AssetFormValues>({
    control,
    name: 'assets',
  });

  const formValues = useWatch({
    control,
    name: 'assets',
  });
  const handleError = useCallback(() => {
    if (getFieldState('assets').invalid) {
      toast.error('لطفاً همه فیلدهای مقدار را پر کنید');
    }
  }, [getFieldState]);

  const handleAppend = useCallback(() => {
    if (getFieldState('assets').invalid) {
      toast.error('لطفاً همه فیلدهای مقدار را پر کنید');
      return;
    }
    append({ title: '', value: '' });
  }, [append, getFieldState]);

  const handleRemove = useCallback((index: number) => remove(index), [remove]);

  const calculateTotal = useCallback(
    (values: AssetFormValues['assets']) =>
      values.reduce(
        (acc, { value }) => acc + Number(value.replace(/,/g, '') || 0),
        0,
      ),
    [],
  );

  const total = useMemo(
    () => calculateTotal(formValues),
    [formValues, calculateTotal],
  );

  const handleNext = useCallback(() => {
    setAssets(formValues);
    setTotalAssets(total);
    incrementCurrentStep();
  }, [setAssets, formValues, incrementCurrentStep, setTotalAssets, total]);

  useEffect(() => {
    setTotalAssets(total);
  }, [total, setTotalAssets]);

  return (
    <FormProvider {...formMethods}>
      <form
        className="relative"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleNext, handleError)}>
        <FormStep className="gap-4">
          {fields.map((field, index) => (
            <AssetFieldRow
              key={field.id}
              index={index}
              onRemove={() => handleRemove(index)}
            />
          ))}
          <Button variant="primary" className="gap-2" onClick={handleAppend}>
            <LucidIcon
              name="plus"
              strokeWidth={2}
              className="size-5 shrink-0"
            />
            اضافه کردن
          </Button>
        </FormStep>
        <FormStepNavigation>
          <TotalValue total={total} title="مجموع دارایی ها" />
        </FormStepNavigation>
      </form>
    </FormProvider>
  );
};

AssetForm.displayName = 'AssetForm';
