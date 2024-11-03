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
  ExpenseFieldRow,
  Button,
  LucidIcon,
  FormStepNavigation,
  TotalValue,
  FormStep,
} from '@components';
import { useStore } from '@hooks';

import { expenseSchema } from '../../form/form.data';
import { ExpenseFormValues } from '../expenses.types';

export const ExpenseForm = () => {
  const expenses = useStore((state) => state.expenses);
  const setExpenses = useStore((state) => state.setExpenses);
  const setTotalExpenses = useStore((state) => state.setTotalExpenses);
  const incrementCurrentStep = useStore((state) => state.onNext);

  const formMethods = useForm<ExpenseFormValues>({
    defaultValues: {
      expenses,
    },
    resolver: zodResolver(expenseSchema),
    mode: 'onChange',
  });

  const { control, trigger, handleSubmit } = formMethods;

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
    if (!isValid) return;

    append({
      title: '',
      value: '',
    });
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
    <FormProvider {...formMethods}>
      <form
        className="relative"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleNext)}>
        <FormStep className="gap-4">
          {fields.map((field, index) => (
            <ExpenseFieldRow
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
          <TotalValue total={total} title="مجموع هزینه ها" />
        </FormStepNavigation>
      </form>
    </FormProvider>
  );
};

ExpenseForm.displayName = 'ExpenseForm';
