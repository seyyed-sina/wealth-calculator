'use server';

import { createClient } from '@/lib/supabase/server';
import { routes } from '@constants';

import { SidebarItem } from './sidebar.type';

export const SidebarItems: SidebarItem[] = [
  {
    title: 'صفحه نخست',
    icon: 'calculator',
    href: '/',
  },
  {
    title: 'سوالات متداول',
    icon: 'circle-help',
    href: routes.FAQ,
  },
  {
    title: 'راهنما',
    icon: 'info',
    href: routes.GUIDE,
  },
  //   {
  //     title: 'درباره ما',
  //     icon: 'info',
  //     href: routes.ABOUT,
  //   },
  {
    title: 'تماس با ما',
    icon: 'phone',
    href: routes.CONTACT,
  },
  {
    title: 'حمایت از ما',
    icon: 'hand-heart',
    href: routes.SUPPORT,
  },
];

export const getUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
