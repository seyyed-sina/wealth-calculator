import { getUser } from '@/lib/supabase/auth';
import { ProfileForm } from '@components';

const ProfilePage = async () => {
  const {
    data: { user },
  } = await getUser();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  return <ProfileForm userData={user} />;
};

export default ProfilePage;
