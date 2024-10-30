'use client';
import { useCallback } from 'react';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { AssetFieldRow, Button, LucidIcon } from '@components';

import { AssetFormValues } from '../assets.types';

export const AssetForm = () => {
  const formMethods = useForm<AssetFormValues>();
  const { handleSubmit, control } = formMethods;

  const { fields, append, remove } = useFieldArray<AssetFormValues>({
    control,
    name: 'assets',
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
            <AssetFieldRow
              key={field.id}
              index={index}
              onAdd={handleAppend}
              onRemove={() => handleRemove(index)}
            />
          ))}
          {fields?.length === 0 && (
            <Button
              variant="empty"
              className="bg-green text-white px-4 gap-2"
              onClick={handleAppend}>
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

AssetForm.displayName = 'AssetForm';
