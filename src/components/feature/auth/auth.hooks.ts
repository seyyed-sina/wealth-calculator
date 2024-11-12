import { useState } from 'react';

import { SupabaseUser } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/client';
import { localFetch } from '@adapter';
import { apiEndpoints } from '@constants';

export const useGetUser = () => {
  const { auth } = createClient();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  auth.onAuthStateChange(async (_event, session) => {
    const userSession = session?.user;
    const shouldUpdate = userSession?.updated_at !== user?.updated_at;
    console.log('shouldUpdate: ', shouldUpdate);

    if (shouldUpdate) {
      if (userSession) {
        const res = await localFetch<SupabaseUser | null>(
          apiEndpoints.LOCAL_GET_USER,
          {
            cache: 'force-cache',
          },
        );
        console.log('res: ', res);

        if (res.status !== 200 || res.data === null || res.error) {
          return;
        }
        setUser(res.data);
      } else {
        setUser(null);
      }
    }
  });

  return user;
};
