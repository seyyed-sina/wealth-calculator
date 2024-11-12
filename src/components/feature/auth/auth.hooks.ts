import { useState } from 'react';

import { User } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/client';
import { localFetch } from '@adapter';

export const useGetUser= () => {
  const { auth } = createClient();
  const [user, setUser] = useState<User | null>(null);

  auth.onAuthStateChange(async (event, session) => {
    const userSession = session?.user;
    const shouldUpdate = userSession?.updated_at === user?.updated_at;

    if (shouldUpdate) {
      if (userSession) {
        const user = await localFetch<User>('/user');
        console.log('user: ', user);
        setUser(user.data);
      } else {
        setUser(null);
      }
    }
  });
};
