'use client';
import { useCallback, useMemo } from 'react';

import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';

import { AssetFieldRow, AssetTotal, Button, LucidIcon } from '@components';
import { useStore } from '@hooks';

import { AssetFormValues } from '../assets.types';

export const AssetForm = () => {
  const formMethods = useForm<AssetFormValues>({
    defaultValues: {
      assets: [],
    },
  });
  const { handleSubmit, control } = formMethods;

  const { fields, append, remove } = useFieldArray<AssetFormValues>({
    control,
    name: 'assets',
  });

  const handleAppend = useCallback(
    () => append({ title: '', value: '' }),
    [append],
  );

  const handleRemove = useCallback((index: number) => remove(index), [remove]);

  const setTotalAssets = useStore((state) => state.setTotalAssets);

  const formValues = useWatch({
    control,
    name: 'assets',
  });

  const total = useMemo(
    () =>
      formValues.reduce(
        (acc, { value }) => acc + Number(value.replace(/,/g, '') || 0),
        0,
      ),
    [formValues],
  );
  console.log('total asset:: ', total);

  setTotalAssets(total);

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
          {total > 0 && <AssetTotal total={total} />}
          {fields.length === 0 && (
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
