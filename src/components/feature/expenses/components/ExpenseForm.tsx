'use client';
import { useCallback, useMemo } from 'react';

import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';

import { ExpenseFieldRow, Button, LucidIcon, ExpenseTotal } from '@components';

import { ExpenseFormValues } from '../expenses.types';
import { useStore } from '@hooks';

export const ExpenseForm = () => {
  const formMethods = useForm<ExpenseFormValues>({
    defaultValues: {
      expenses: [],
    },
  });
  const { handleSubmit, control } = formMethods;

  const { fields, append, remove } = useFieldArray<ExpenseFormValues>({
    control,
    name: 'expenses',
  });

  const handleAppend = useCallback(() => {
    append({ title: '', value: '' });
  }, [append]);

  const handleRemove = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  const setTotalExpenses = useStore((state) => state.setTotalExpenses);

  const formValues = useWatch({
    control,
    name: 'expenses',
  });

  const total = useMemo(
    () =>
      formValues.reduce(
        (acc, { value }) => acc + Number(value.replace(/,/g, '') || 0),
        0,
      ),
    [formValues],
  );
  console.log('total exes:: ', total);

  setTotalExpenses(total);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <ExpenseFieldRow
              key={field.id}
              index={index}
              onAdd={handleAppend}
              onRemove={() => handleRemove(index)}
            />
          ))}
          {total > 0 && <ExpenseTotal total={total} />}
          {fields?.length === 0 && (
            <Button variant="green" className="gap-2" onClick={handleAppend}>
              <LucidIcon
                name="plus"
                strokeWidth={2}
                className="size-5 shrink-0"
              />
              اضافه کردن
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

ExpenseForm.displayName = 'ExpenseForm';
