import { routes } from '@constants';

import { DropdownMenu } from './user.types';

export const dropdownMenuItems: DropdownMenu[] = [
  {
	id: 1,
    label: 'ویرایش پروفایل',
    path: routes.PROFILE,
    icon: 'user-pen',
  },
];
