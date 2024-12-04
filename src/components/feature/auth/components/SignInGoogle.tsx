'use client';
import { useTransition } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { IconGoogle, Button, LoadingSpinner } from '@components';
import { colorValue } from '@constants';

import { signInWithSocialAction } from '../auth.actions';

export const SignInGoogle = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAction = () => {
    startTransition(async () => {
      const { error, url } = await signInWithSocialAction('google');

      if (!error && url) {
        router.push(url);
      } else {
        toast.error(error);
      }
    });
  };

  return (
    <Button
      variant="border-gray-100"
      className="mx-auto text-sm gap-2"
      disabled={isPending}
      onClick={handleAction}>
      {isPending ? (
        <LoadingSpinner size={20} fill={colorValue.primary.DEFAULT} />
      ) : (
        <IconGoogle width={20} height={20} />
      )}
      ورود از طریق گوگل
    </Button>
  );
};

SignInGoogle.displayName = 'SignInGoogle';
