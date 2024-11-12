'use client';
import { useGetUser } from '../../auth/auth.hooks';

export const SidebarUser = () => {
  const user = useGetUser();
  console.log('user in sidebar: ', user);
  return <div className="mt-auto">سلام, {user?.user_metadata?.full_name}</div>;
};

SidebarUser.displayName = 'SidebarUser';
