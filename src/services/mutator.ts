import {
  Profile,
  ProfileFormData,
} from '@/components/feature/profile/profile.types';
import { localMutate } from '@adapter';
import { apiEndpoints } from '@constants';

export const mutate = {
  userProfile: (data: ProfileFormData) =>
    localMutate<Profile>(apiEndpoints.LOCAL_UPDATE_PROFILE, {
      body: JSON.stringify(data),
      method: 'PATCH',
    }),
} as const;
