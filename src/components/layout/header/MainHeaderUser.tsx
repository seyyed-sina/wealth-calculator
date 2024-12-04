'use client';
import { useGetUser } from '@/lib/supabase/auth/client';
import { Button, UserAvatar } from '@components';
import { routes } from '@constants';

export const MainHeaderUser = () => {
  const user = useGetUser();
  // const user = data?.data;
  console.log('user in header: ', user);

  return (
    <div className="absolute left-4">
      {/* {isLoading && <LoadingMask className="h-9 w-12" />} */}
      {user && <UserAvatar user={user} width={36} height={36} />}
      {!user && (
        <div className="flex items-center gap-1 text-sm">
          <Button tag="a" href={routes.SIGN_IN} size="sm" label="ورود" />
        </div>
      )}
    </div>
  );
};

MainHeaderUser.displayName = 'MainHeaderUser';
