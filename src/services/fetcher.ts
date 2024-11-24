import { Profile } from '@/components/feature/profile/profile.types';
import { apiEndpoints } from '@constants';

import { localFetch } from './adapter';

export const fetch = {
  userProfile: () => localFetch<Profile>(apiEndpoints.LOCAL_GET_PROFILE),
} as const;
