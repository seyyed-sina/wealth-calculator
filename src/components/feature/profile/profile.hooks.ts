import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryOptions,
	UseQueryResult,
} from '@tanstack/react-query';

import { queryKey } from '@constants';
import { LocalResponse } from '@types';
import { fetch } from 'src/services/fetcher';
import { mutate } from 'src/services/mutator';

import { Profile } from './profile.types';

export const useGetProfile = (
  options?: UseQueryOptions<LocalResponse<Profile>>,
): UseQueryResult<LocalResponse<Profile>> => {
  return useQuery({
    queryKey: [queryKey.GET_PROFILE],
    queryFn: () => fetch.userProfile(),
    ...options,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [queryKey.UPDATE_PROFILE],
    mutationFn: mutate.userProfile,
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: [queryKey.GET_PROFILE] }),
  });
};
