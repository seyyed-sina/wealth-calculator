'use client';
import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  AvatarControl,
  FormField,
  FormValidation,
  SubmitButton,
} from '@components';
import { queryKey } from '@constants';
import { getErrorMessage } from '@utils';

import { profileSchema } from '../profile.data';
import { useGetProfile, useUpdateProfile } from '../profile.hooks';
import { Profile as IProfileForm } from '../profile.types';

export const ProfileForm = () => {
  const { data, isLoading, isSuccess } = useGetProfile({
    queryKey: [queryKey.GET_PROFILE],
    staleTime: 0,
  });
  const { mutate, isPending, data: updateData } = useUpdateProfile();
  const userData = data?.data;

  const formMethods = useForm<IProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: '',
      profile_image: '',
      email: '',
    },
  });

  const {
    reset,
    getValues,
    register,
    handleSubmit,
    formState: { isDirty, errors, isSubmitting },
  } = formMethods;

  const onSubmit: SubmitHandler<IProfileForm> = (data) => {
    const api_data: IProfileForm = {
      ...data,
      profile_image: getValues('profile_image'),
    };

    try {
      mutate(api_data, {
        onSuccess: () => {
          toast.success('ویرایش با موفقیت انجام شد', {
            duration: 5000,
          });
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      });
      if (updateData?.error) {
        throw new Error(updateData.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset({
        ...userData,
      });
    }
  }, [reset, userData, isSuccess]);

  return (
    <section className="py-8 flex flex-col gap-6">
      <FormProvider {...formMethods}>
        <form
          noValidate
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}>
          <AvatarControl
            name="profile_image"
            defaultValue={userData?.profile_image}
            isDisabled={isPending}
          />
          <FormField label="نام و نام خانوادگی" inputId="full_name" required>
            <input
              {...register('full_name')}
              id="full_name"
              type="text"
              aria-invalid={!!errors.full_name}
              disabled={isSubmitting || isLoading}
              className="inputbox w-full"
            />
            {errors.full_name && (
              <FormValidation error={errors.full_name.message ?? ''} />
            )}
          </FormField>
          <FormField label="ایمیل" inputId="email" required>
            <input
              {...register('email')}
              id="email"
              type="email"
              aria-invalid={!!errors.email}
              disabled={isSubmitting || isLoading}
              className="inputbox w-full"
            />
            {errors.email && (
              <FormValidation error={errors.email.message ?? ''} />
            )}
          </FormField>
          <SubmitButton
            label="ویرایش"
            disabled={!isDirty || isPending}
            isSubmitting={isPending}
          />
        </form>
      </FormProvider>
    </section>
  );
};

ProfileForm.displayName = 'ProfileForm';
