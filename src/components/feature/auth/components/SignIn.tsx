import { useActionState } from 'react';

import Link from 'next/link';

import { FormField, SignInGoogle, SubmitButton } from '@components';
import { routes } from '@constants';

import { signInAction } from '../auth.actions';

export const SignIn = () => {
  // const [state, formAction] = useActionState(signInAction, null);
  // console.log('state: ', state);

  return (
    <section className="py-8 flex flex-col gap-6">
      <SignInGoogle />
      {/* <form action={formAction} className="flex flex-col gap-4">
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
        <SubmitButton label="ورود" />
      </form> */}
      <div className="flex items-center justify-center text-center text-sm gap-1">
        عضو نیستید؟{' '}
        <Link href={routes.SIGN_UP} className="text-primary" shallow>
          ثبت نام
        </Link>
      </div>
    </section>
  );
};

SignIn.displayName = 'SignIn';
