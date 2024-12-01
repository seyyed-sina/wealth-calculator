'use client';
import { useGetProfile } from '@/components/feature/profile/profile.hooks';
import { Button, UserAvatar } from '@components';
import { routes } from '@constants';

export const MainHeaderUser = () => {
  const { data } = useGetProfile();
  const user = data?.data;
  console.log('user in header: ', user);

  return (
    <div className="absolute left-4">
      {user && <UserAvatar user={user} width={36} height={36} />}
      {!user && (
        <div className="flex items-center gap-1 text-sm">
          <Button tag="a" href={routes.SIGN_IN} size="small" label="ورود" />
        </div>
      )}
    </div>
  );
};

MainHeaderUser.displayName = 'MainHeaderUser';
