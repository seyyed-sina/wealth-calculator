'use client';
import { useCallback, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';

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
  const assets = useStore((state) => state.assets);
  const setAssets = useStore((state) => state.setAssets);
  const setTotalAssets = useStore((state) => state.setTotalAssets);
  const incrementCurrentStep = useStore((state) => state.onNext);

  const formMethods = useForm<AssetFormValues>({
    defaultValues: {
      assets,
    },
    resolver: zodResolver(assetSchema),
    mode: 'onChange',
  });

  const { control, trigger, handleSubmit } = formMethods;

  const { fields, append, remove } = useFieldArray<AssetFormValues>({
    control,
    name: 'assets',
  });

  const formValues = useWatch({
    control,
    name: 'assets',
  });

  const handleAppend = useCallback(async () => {
    const isValid = await trigger('assets');
    if (!isValid) return;

    append({ title: '', value: '' });
  }, [append, trigger]);

  const handleRemove = useCallback((index: number) => remove(index), [remove]);

  const total = useMemo(
    () =>
      formValues.reduce(
        (acc, { value }) => acc + Number(value.replace(/,/g, '') || 0),
        0,
      ),
    [formValues],
  );

  const handleNext = useCallback(async () => {
    const isValid = await trigger('assets');
    if (!isValid) return;

    setAssets(formValues);
    setTotalAssets(total);
    incrementCurrentStep();
  }, [
    setAssets,
    formValues,
    incrementCurrentStep,
    setTotalAssets,
    total,
    trigger,
  ]);

  return (
    <FormProvider {...formMethods}>
      <form
        noValidate
        className="relative"
        autoComplete="off"
        onSubmit={handleSubmit(handleNext)}>
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
