import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { env } from '@constants';

const supabaseUrl = env.SUPABASE_URL;
const supabaseAnonKey = env.SUPABASE_ANON_KEY;

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

export async function getSupabaseAuth() {
  const { auth } = await createClient();
  return auth;
}

export async function getUser() {
  const auth = await getSupabaseAuth();
  const { data } = await auth.getUser();
  return data?.user ?? null;
}
