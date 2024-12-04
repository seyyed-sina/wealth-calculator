'use client';
import { useCallback, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';
import { toast } from 'sonner';

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
    mode: 'onSubmit',
  });

  const { control, handleSubmit, getFieldState } = formMethods;

  const { fields, append, remove } = useFieldArray<ExpenseFormValues>({
    control,
    name: 'expenses',
  });

  const formValues = useWatch({
    control,
    name: 'expenses',
  });

  const handleAppend = useCallback(() => {
    append({
      title: '',
      value: '',
    });
  }, [append]);

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

  const handleNext = useCallback(() => {
    setExpenses(formValues);
    setTotalExpenses(total);
    incrementCurrentStep();
  }, [setExpenses, formValues, incrementCurrentStep, setTotalExpenses, total]);

  const handleError = () => {
    if (getFieldState('expenses').invalid) {
      toast.error('لطفاً همه فیلدهای مقدار را پر کنید');
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        className="relative"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleNext, handleError)}>
        <FormStep className="gap-4">
          {fields.map((field, index) => (
            <ExpenseFieldRow
              key={field.id}
              index={index}
              onRemove={() => handleRemove(index)}
            />
          ))}
          <Button
            variant="primary"
            size="lg"
            className="gap-2"
            onClick={handleAppend}>
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
