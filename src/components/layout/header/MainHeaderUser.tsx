import Link from 'next/link';

import { getUserName } from '@/components/feature/user/user.actions';
import { getUser } from '@/lib/supabase/auth';
import { UserAvatar } from '@components';
import { routes } from '@constants';

export const MainHeaderUser = async () => {
  const {
    data: { user },
  } = await getUser();
  const { userName } = await getUserName();
  const userMeta = user?.user_metadata;

  return (
    <div className="absolute left-4">
      {userMeta && (
        <UserAvatar user={user} userName={userName} width={36} height={36} />
      )}
      {!user && (
        <div className="flex items-center gap-1 text-sm">
          <Link href={routes.SIGN_IN}>ورود</Link>
          <Link href={routes.SIGN_UP}>ثبت نام</Link>
        </div>
      )}
    </div>
  );
};

MainHeaderUser.displayName = 'MainHeaderUser';
