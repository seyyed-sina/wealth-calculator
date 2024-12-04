import { useEffect, useState } from 'react';

import { Profile } from '@/components/feature/profile/profile.types';
import { localFetch } from '@adapter';
import { apiEndpoints } from '@constants';

import { createClient } from '../client';

export const getAuth = () => {
  const { auth } = createClient();
  return auth;
};

export const useGetUser = () => {
  const [user, setUser] = useState<Profile | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const subscription = auth.onAuthStateChange(async (_event, session) => {
      const sessionUser = session?.user;
      if (sessionUser?.id !== user?.id) {
        const user = await localFetch<Profile>(apiEndpoints.LOCAL_GET_USER);
        // const user: Profile = await response.json();
        setUser(user.data);
      }
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, [auth, user]);

  return user;
};
