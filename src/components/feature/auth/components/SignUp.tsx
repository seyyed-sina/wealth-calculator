'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormField, FormValidation, SubmitButton } from '@components';
import { routes } from '@constants';

import { signUpAction } from '../auth.actions';
import { signUpSchema } from '../auth.data';
import { SignUpForm } from '../auth.types';

export const SignUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    defaultValues: {
      email: '',
      password: '',
      full_name: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    const { errorMessage } = await signUpAction(data);
    if (!errorMessage) {
      router.replace('/');
      toast.success('ثبت نام با موفقیت انجام شد', {
        duration: 4000,
      });
    } else {
      toast.error(errorMessage);
    }
  };

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
        <FormField label="ایمیل" inputId="email" required>
          <input
            {...register('email')}
            id="email"
            type="email"
            aria-invalid={!!errors.email}
            disabled={isSubmitting}
            className="inputbox w-full ltr"
          />
          {errors.email && (
            <FormValidation error={errors.email.message ?? ''} />
          )}
        </FormField>
        <FormField label="رمز عبور" inputId="password" required>
          <input
            {...register('password')}
            id="password"
            type="password"
            aria-invalid={!!errors.password}
            disabled={isSubmitting}
            className="inputbox w-full ltr"
          />
          {errors.password && (
            <FormValidation error={errors.password.message ?? ''} />
          )}
        </FormField>
        <SubmitButton label="ثبت نام" isSubmitting={isSubmitting} />
      </form>
      <div className="flex items-center justify-center text-center text-sm gap-1">
        قبلا ثبت نام کرده اید؟{' '}
        <Link href={routes.SIGN_IN} className="text-primary" shallow>
          ورود
        </Link>
      </div>
    </section>
  );
};

SignUp.displayName = 'SignUp';
