import { createBrowserClient } from '@supabase/ssr';

import { env } from '@constants';

const supabaseUrl = env.SUPABASE_URL;
const supabaseAnonKey = env.SUPABASE_ANON_KEY;

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
