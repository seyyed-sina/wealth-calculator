'use server';
import { createServerClient } from '@supabase/ssr';
import { SupabaseUser } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

import { dbTables, env } from '@constants';
import { getErrorMessage } from '@utils';

import { createClient } from './server';

const supabaseUrl = env.SUPABASE_URL;
const supabaseAnonKey = env.SUPABASE_ANON_KEY;

export async function getSupabaseAuth() {
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
  const { auth } = await createClient();
  return (await auth.getUser()) as {
    data: { user: SupabaseUser | null };
    error: any;
  };
}

export const getUserName = async () => {
  try {
    const supabase = await createClient();

    // Get the authenticated user
    const {
      data: { user },
      error: userError,
    } = (await supabase.auth.getUser()) as {
      data: { user: SupabaseUser | null };
      error: any;
    };

    if (userError || !user) {
      throw new Error(userError?.message || 'User not authenticated');
    }

    // Fetch user profile from 'profiles' table
    const { data: profile, error: profileError } = await supabase
      .from(dbTables.profiles.name)
      .select(dbTables.profiles.columns.full_name)
      .eq(dbTables.profiles.columns.user_id, user.id)
      .single(); // Fetch single record for the logged-in user

    if (profileError && profileError.code !== 'PGRST116') {
      // 'PGRST116' means no rows were found; ignore it
      throw profileError;
    }

    // Use full_name from profiles table, fallback to user_metadata
    const userName =
      profile?.full_name || user.user_metadata?.full_name || 'کاربر ناشناس';

    return { errorMessage: null, user: { ...user, full_name: userName } };
  } catch (error) {
    return { errorMessage: getErrorMessage(error), userName: 'کاربر ناشناس' };
  }
};
