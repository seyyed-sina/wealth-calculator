'use client';
import { useCallback, useMemo } from 'react';

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import {
  AssetFieldRow,
  AssetTotal,
  Button,
  FormStep,
  FormStepNavigation,
  LucidIcon,
} from '@components';
import { useStore } from '@hooks';

import { AssetFormValues } from '../assets.types';

export const AssetForm = () => {
  const { control, trigger } = useFormContext<AssetFormValues>();
  const direction = useStore((state) => state.direction);
  const setAssets = useStore((state) => state.setAssets);
  const setTotalAssets = useStore((state) => state.setTotalAssets);
  const incrementCurrentStep = useStore((state) => state.onNext);

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
    if (isValid) {
      append({ title: '', value: '' });
    }
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
    <>
      <FormStep direction={direction} className="gap-4">
        {fields.map((field, index) => (
          <AssetFieldRow
            key={field.id}
            index={index}
            onRemove={() => handleRemove(index)}
          />
        ))}
        <Button
          variant="empty"
          className="bg-green text-white px-4 gap-2"
          onClick={handleAppend}>
          <LucidIcon name="plus" strokeWidth={2} className="size-5 shrink-0" />
          اضافه کردن
        </Button>
        {total > 0 && <AssetTotal total={total} />}
      </FormStep>
      <FormStepNavigation onNext={handleNext} />
    </>
  );
};

AssetForm.displayName = 'AssetForm';
