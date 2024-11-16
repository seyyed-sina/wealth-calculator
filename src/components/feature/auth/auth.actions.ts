'use server';
import { Provider } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

import { getSupabaseAuth } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { env } from '@constants';
import { getErrorMessage } from '@utils';

import { SignUpForm } from './auth.types';

export async function signUpAction(formData: SignUpForm) {
  try {
    const auth = await getSupabaseAuth();
    const credentials = {
      email: formData.email,
      password: formData.password,
    };

    const { error } = await auth.signUp({
      ...credentials,
      options: { data: { full_name: formData.full_name } },
    });

    if (error) throw error;

    const authData = {
      email: formData.email,
      password: formData.password,
    };

    const { data, error: loginError } = await auth.signInWithPassword(authData);

    if (loginError) throw loginError;

    if (!data.session) throw new Error('No session');

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
}

export async function signInWithPasswordAction(formData: FormData) {
  const auth = await getSupabaseAuth();

  try {
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const authData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const { data, error } = await auth.signInWithPassword(authData);

    if (error) throw error;
    if (!data.session) throw new Error('No session');

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
}

export const signInWithSocialAction = async (provider: Provider) => {
  try {
    const publicUrl = env.PUBLIC_URL;
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${publicUrl}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw error;

    return { errorMessage: null, url: data.url };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

export const signOutAction = async () => {
  try {
    const auth = await getSupabaseAuth();
    const { error } = await auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};
