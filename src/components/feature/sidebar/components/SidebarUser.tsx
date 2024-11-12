'use client';;
import { useGetUser } from '../../auth/auth.hooks';

export const SidebarUser = () => {
  const user = useGetUser();
  console.log('user: ', user);
  return <div className="mt-auto">سلام,</div>;
};

SidebarUser.displayName = 'SidebarUser';
