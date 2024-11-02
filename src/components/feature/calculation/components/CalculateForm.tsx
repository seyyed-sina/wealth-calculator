'use client';;
import {
  CalculateTotal,
  FormattedInputControl,
  FormField,
  FormStep,
} from '@components';
import { useStore } from '@hooks';

// import { CalculateForm as ICalculateForm } from '../calculation.types';

export const CalculateForm = () => {
  const direction = useStore((state) => state.direction);
  // const { handleSubmit } = useForm<ICalculateForm>({
  //   defaultValues: {
  //     pureAsset: '',
  //   },
  // });

  return (
    <FormStep direction={direction} className="gap-4">
      <FormField
        label="مال مخمس (مال خمس داده شده سال قبل)"
        inputId="pureAsset">
        <FormattedInputControl
          name="pureAsset"
          id="pureAsset"
          currencyUnit="تومان"
          className="inputbox w-full"
          aria-placeholder="مقدار"
        />
      </FormField>
      <CalculateTotal />
    </FormStep>
  );
};

CalculateForm.displayName = 'CalculateForm';
