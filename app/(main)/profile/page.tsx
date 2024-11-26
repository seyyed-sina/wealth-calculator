import { getUser } from '@/lib/supabase/auth';
import { ForbiddenContent, ProfileForm } from '@components';

const ProfilePage = async () => {
  const {
    data: { user },
  } = await getUser();

  if (!user) {
    return <ForbiddenContent />;
  }

  return <ProfileForm />;
};

export default ProfilePage;
