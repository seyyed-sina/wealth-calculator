'use client';
import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormField, FormValidation, SubmitButton } from '@components';
import { queryKey } from '@constants';

import { profileSchema } from '../profile.data';
import { useGetProfile, useUpdateProfile } from '../profile.hooks';
import { Profile as IProfileForm } from '../profile.types';

export const ProfileForm = () => {
  const { data, isLoading, isSuccess } = useGetProfile({
    queryKey: [queryKey.GET_PROFILE],
    staleTime: 0,
  });
  const { mutate, isPending, error } = useUpdateProfile();
  const userData = data?.data;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<IProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: '',
    },
  });

  const onSubmit: SubmitHandler<IProfileForm> = (data) => {
    if (error) {
      toast.error(error.message);
    }
    mutate(data, {
      onSuccess: () => {
        toast.success('ویرایش با موفقیت انجام شد', {
          duration: 4000,
        });
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      reset({
        ...userData,
        full_name: userData?.full_name ?? userData?.user_metadata.full_name,
      });
    }
  }, [reset, userData, isSuccess]);

  return (
    <section className="py-8 flex flex-col gap-6">
      <form
        className="flex flex-col gap-4"
        noValidate
        onSubmit={handleSubmit(onSubmit)}>
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
        <SubmitButton
          label="ویرایش"
          disabled={!isDirty}
          isSubmitting={isPending}
        />
      </form>
    </section>
  );
};

ProfileForm.displayName = 'ProfileForm';
