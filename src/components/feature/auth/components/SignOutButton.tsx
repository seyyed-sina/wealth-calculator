'use client';
import { useTransition } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { LoadingSpinner, LucidIcon } from '@components';
import { colorValue } from '@constants';

import { signOutAction } from '../auth.actions';

export const SignOutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  /**
   * Handles sign out action.
   * Starts a transition, calls signOutAction and handles its result.
   * If the result contains an error message, shows an error toast.
   * If the result is successful, redirects to the main page.
   */
  const handleAction = () => {
    startTransition(async () => {
      const { errorMessage } = await signOutAction();

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        router.replace('/');
      }
    });
  };

  return (
    <span
      role="button"
      className="text-red flex items-center justify-start cursor-pointer text-sm h-auto gap-2 w-full"
      onKeyDown={handleAction}
      onClick={handleAction}>
      {isPending ? (
        <LoadingSpinner size={20} fill={colorValue.red.DEFAULT} />
      ) : (
        <LucidIcon name="log-out" className="size-5" />
      )}
      <span>خروج</span>
    </span>
  );
};

SignOutButton.displayName = 'SignOutButton';
