import { SubmitButton, LucidIcon } from '@components';

import { signInAction } from '../auth.actions';

export const SignInGoogle = () => {
  return (
    <form action={signInAction}>
      <SubmitButton className="mx-auto">
        <LucidIcon name="log-in" />
        Sign in with Google
      </SubmitButton>
    </form>
  );
}

SignInGoogle.displayName = 'SignInGoogle';