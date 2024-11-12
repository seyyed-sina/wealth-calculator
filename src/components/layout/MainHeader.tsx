'use client';
import { useMemo } from 'react';

import { usePathname } from 'next/navigation';

import { Button, LucidIcon } from '@components';
import { routes } from '@constants';
import { useStore } from '@hooks';

export const MainHeader = () => {
  const pathname = usePathname();
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  const getPageTitle = useMemo(() => {
    switch (pathname) {
      case routes.SIGN_IN:
        return 'ورود';
      case routes.SIGN_UP:
        return 'ثبت نام';
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
      default:
        return 'خمس من';
    }
  }, [pathname]);

  return (
    <header className="border-solid border-b border-b-gray-100 bg-gray-50 h-18 fixed top-0 w-full z-20">
      <div className="container max-w-2xl flex items-center justify-center text-center h-full relative">
        <Button
          variant="empty"
          className="absolute right-2 size-10"
          onClick={toggleSidebar}>
          <LucidIcon name="menu" className="size-6" />
        </Button>
        <h1 className="text-xl font-bold">{getPageTitle}</h1>
      </div>
    </header>
  );
};

MainHeader.displayName = 'MainHeader';
MainHeader.displayName = 'MainHeader';
