'use client';
import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SupabaseUser } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormField, FormValidation, SubmitButton } from '@components';

import { updateUserAction } from '../profile.actions';
import { profileSchema } from '../profile.data';
import { ProfileForm as IProfileForm } from '../profile.types';

interface ProfileFormProps {
  userData: SupabaseUser;
}

export const ProfileForm = ({ userData }: ProfileFormProps) => {
  const router = useRouter();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit: SubmitHandler<IProfileForm> = async (data) => {
    const { errorMessage } = await updateUserAction(data);
    if (!errorMessage) {
      router.refresh();
      toast.success('ویرایش با موفقیت انجام شد', {
        duration: 4000,
      });
    } else {
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (userData?.user_metadata) {
      reset({
        ...userData.user_metadata,
      });
    }
  }, [reset, userData.user_metadata]);

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
            disabled={isSubmitting}
            className="inputbox w-full"
          />
          {errors.full_name && (
            <FormValidation error={errors.full_name.message ?? ''} />
          )}
        </FormField>
        <SubmitButton label="ویرایش" isSubmitting={isSubmitting} />
      </form>
    </section>
  );
};

ProfileForm.displayName = 'ProfileForm';
