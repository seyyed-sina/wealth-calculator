'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { FormField, SignInGoogle, SubmitButton } from '@components';
import { routes } from '@constants';

import { signInWithPasswordAction } from '../auth.actions';

export const SignIn = () => {
  const router = useRouter();
  // const [pending, startTransition] = useTransition();

  const handleAction = async (formData: FormData) => {
    const { errorMessage } = await signInWithPasswordAction(formData);
    if (!errorMessage) {
      router.replace('/');
      toast.success('ورود با موفقیت انجام شد', { duration: 5000 });
    } else {
      toast.error(errorMessage);
    }
  };
  return (
    <section className="py-8 flex flex-col gap-6">
      <SignInGoogle />
      <form action={handleAction} className="flex flex-col gap-4">
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
      </form>
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
