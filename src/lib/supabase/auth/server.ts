'use server';
import { createServerClient } from '@supabase/ssr';
import { SupabaseUser } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@constants';

import { createClient } from '../server';

const supabaseUrl = env.SUPABASE_URL;
const supabaseAnonKey = env.SUPABASE_ANON_KEY;

export async function getAuth() {
  const { auth } = await createClient();
  return auth;
}

export async function checkSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

/**
 * Gets the currently logged in user.
 *
 * @returns {Promise<SupabaseUser | null>}
 */
export async function getUser() {
  const auth = await getAuth();
  return (await auth.getUser()) as {
    data: { user: SupabaseUser | null };
    error: any;
  };
}
