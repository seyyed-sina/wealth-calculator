'use server';
import { Provider } from '@supabase/supabase-js';

import { getAuth } from '@/lib/supabase/auth/server';
import { createClient } from '@/lib/supabase/server';
import { env } from '@constants';
import { getErrorMessage } from '@utils';

import { SignUpForm } from './auth.types';

const PUBLIC_URL = env.PUBLIC_URL;
const REDIRECT_URL = `${PUBLIC_URL}/api/auth/callback`;

export const signUpAction = async (formData: SignUpForm) => {
  try {
    const auth = await getAuth();
    const authData = {
      email: formData.email,
      password: formData.password,
    };
    
    const { error } = await auth.signUp(authData);

    // Check error
    if (
      error?.code === 'user_already_exists' ||
      error?.code === 'email_exists'
    ) {
      return {
        error: 'کاربری با این ایمیل وجود دارد. لطفاً وارد حساب خود شوید',
        data: null,
      };
    }

    if (error) throw error;

    // temporary redirect to verify email
    // TO DO: redirect to /login after email verification
    const { data, error: loginError } = await auth.signInWithPassword(authData);

    if (loginError) throw loginError;

    if (!data.session) throw new Error('No session');

    return { error: null };
  } catch (error) {
    return { error: getErrorMessage(error), data: null };
  }
};

export async function signInWithPasswordAction(formData: FormData) {
  try {
    const auth = await getAuth();
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const authData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const { data, error } = await auth.signInWithPassword(authData);

    if (error?.code === 'invalid_credentials') {
      return { error: 'ایمیل یا رمز عبور اشتباه است', data: null };
    }

    if (error) throw error;

    if (!data.session) throw new Error('No session');

    return { error: null, data };
  } catch (error) {
    return { error: getErrorMessage(error), data: null };
  }
}

export const signInWithSocialAction = async (provider: Provider) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: REDIRECT_URL,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw error;

    return { error: null, url: data.url };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const signOutAction = async () => {
  try {
    const auth = await getAuth();
    const { error } = await auth.signOut();
    if (error) throw error;

    return { error: null };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};
