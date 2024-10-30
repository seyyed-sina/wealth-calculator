'use client';
import { useCallback } from 'react';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { ExpenseFieldRow, Button, LucidIcon } from '@components';

import { ExpenseFormValues } from '../expenses.types';

export const ExpenseForm = () => {
  const formMethods = useForm<ExpenseFormValues>();
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
