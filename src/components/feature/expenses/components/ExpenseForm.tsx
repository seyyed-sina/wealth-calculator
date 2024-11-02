'use client';
import { useCallback, useMemo } from 'react';

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import {
  ExpenseFieldRow,
  Button,
  LucidIcon,
  ExpenseTotal,
  FormStep,
  FormStepNavigation,
} from '@components';
import { useStore } from '@hooks';

import { ExpenseFormValues } from '../expenses.types';

export const ExpenseForm = () => {
  const direction = useStore((state) => state.direction);
  const incrementCurrentStep = useStore((state) => state.onNext);
  const setExpenses = useStore((state) => state.setExpenses);
  const setTotalExpenses = useStore((state) => state.setTotalExpenses);

  const { control, trigger } = useFormContext<ExpenseFormValues>();

  const { fields, append, remove } = useFieldArray<ExpenseFormValues>({
    control,
    name: 'expenses',
  });
  const formValues = useWatch({
    control,
    name: 'expenses',
  });

  const handleAppend = useCallback(async () => {
    const isValid = await trigger('expenses');

    if (isValid) {
      append({
        title: '',
        value: '',
      });
    }
  }, [append, trigger]);

  const handleRemove = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  const total = useMemo(
    () =>
      formValues.reduce(
        (acc, { value }) => acc + Number(value.replace(/,/g, '') || 0),
        0,
      ),
    [formValues],
  );

  const handleNext = useCallback(async () => {
    const isValid = await trigger('expenses');
    if (!isValid) return;

    setExpenses(formValues);
    setTotalExpenses(total);
    incrementCurrentStep();
  }, [
    setExpenses,
    formValues,
    incrementCurrentStep,
    setTotalExpenses,
    total,
    trigger,
  ]);

  return (
    <>
      <FormStep direction={direction} className="gap-4">
        {fields.map((field, index) => (
          <ExpenseFieldRow
            key={field.id}
            index={index}
            onRemove={() => handleRemove(index)}
          />
        ))}
        <Button variant="green" className="gap-2" onClick={handleAppend}>
          <LucidIcon name="plus" strokeWidth={2} className="size-5 shrink-0" />
          اضافه کردن
        </Button>
        {total > 0 && <ExpenseTotal total={total} />}
      </FormStep>
      <FormStepNavigation onNext={handleNext} />
    </>
  );
};

ExpenseForm.displayName = 'ExpenseForm';
