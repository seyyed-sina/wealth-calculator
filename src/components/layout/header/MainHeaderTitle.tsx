'use client';
import { useMemo } from 'react';

import { usePathname } from 'next/navigation';

import { routes } from '@constants';

export const MainHeaderTitle = () => {
  const pathname = usePathname();

  const getPageTitle = useMemo(() => {
    switch (pathname) {
      case routes.SUPPORT:
        return 'حمایت از ما';
      case routes.ABOUT:
        return 'درباره ما';
      case routes.CONTACT:
        return 'تماس با ما';
      case routes.GUIDE:
        return 'راهنما';
      case routes.FAQ:
        return 'سوالات متداول';
      case routes.PROFILE:
        return 'پروفایل';
      default:
        return 'خمس من';
    }
  }, [pathname]);

  return <h1 className="text-xl font-bold">{getPageTitle}</h1>;
};

MainHeaderTitle.displayName = 'MainHeaderTitle';
