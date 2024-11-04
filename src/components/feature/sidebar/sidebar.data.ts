import { routes } from '@constants';

import { SidebarItem } from './sidebar.type';

export const SidebarItems: SidebarItem[] = [
  {
    title: 'محاسبه',
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
