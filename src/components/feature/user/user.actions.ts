'use server';
import { createClient } from '@/lib/supabase/server';
import { getErrorMessage } from '@utils';

export const getUserName = async () => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error(userError?.message ?? 'User not authenticated');
    }
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('user_id', user.id)
      .single(); // Fetch single record for the logged-in user

    if (profileError && profileError.code !== 'PGRST116') {
      // 'PGRST116' means no rows were found; ignore it
      throw profileError;
    }

    // Use full_name from profiles table, fallback to user_metadata
    const userName =
      profile?.full_name || user.user_metadata?.full_name || 'کاربر ناشناس';

    return { errorMessage: null, userName };
  } catch (error) {
    return { errorMessage: getErrorMessage(error), userName: 'کاربر ناشناس' };
  }
};
