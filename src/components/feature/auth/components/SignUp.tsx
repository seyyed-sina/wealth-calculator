'use client';
import { useActionState } from 'react';

import Link from 'next/link';

import { FormField, FormValidation, SubmitButton } from '@components';
import { routes } from '@constants';

import { signUpAction } from '../auth.actions';

export const SignUp = () => {
  const [state, formAction] = useActionState(signUpAction, null);
  console.log('state: ', state);

  return (
    <section className="py-8 flex flex-col gap-6">
      <form action={formAction} className="flex flex-col gap-4">
        <FormField label="ایمیل" inputId="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            className="inputbox w-full"
          />
        </FormField>
        <FormField label="رمز عبور" inputId="password">
          <input
            id="password"
            name="password"
            type="password"
            required
            className="inputbox w-full"
          />
        </FormField>
        <SubmitButton label="ثبت نام" />
        {state && <FormValidation error={state} />}
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
