'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient, getSupabaseAuth } from '@/lib/supabase/server';

// export async function signInAction(currentState: any, formData: FormData) {
export async function signInAction() {
  // const supabase = await createClient();

  // // type-casting here for convenience
  // // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // };

  // const { error } = await supabase.auth.signInWithPassword(data);
  // console.log('error login user: ', error?.status);

  // if (error?.status === 400 || error?.code === 'invalid_credentials') {
  //   return 'اطلاعات ورود نادرست است';
  // }

  // revalidatePath('/', 'layout');
  // redirect('/');
  const auth = await getSupabaseAuth();

  const { data, error } = await auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:5000/auth/callback',
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  console.log('error: ', error);

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}

export async function signUpAction(state: any, formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);
  console.log('error of sign up: ', error);

  if (error) {
    return error.message;
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
