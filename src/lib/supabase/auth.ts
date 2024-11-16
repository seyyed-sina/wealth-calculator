'use server';
import { SupabaseUser } from '@supabase/supabase-js';

import { createClient } from './server';

export async function getSupabaseAuth() {
  const { auth } = await createClient();
  return auth;
}

/**
 * Gets the currently logged in user.
 *
 * @returns {Promise<SupabaseUser | null>}
 */
export async function getUser() {
  const { auth } = await createClient();
  return (await auth.getUser()) as { data: { user: SupabaseUser | null }; error: any };
}
