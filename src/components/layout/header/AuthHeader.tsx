'use client';
import { usePathname } from 'next/navigation';

import { Button, LucidIcon } from '@components';
import { routes } from '@constants';

export const AuthHeader = () => {
  const pathname = usePathname();
  return (
    <header
      className="border-solid border-b border-b-gray-100 bg-gray-50 h-18 fixed 
        top-0 w-full z-20">
      <div className="container max-w-2xl flex items-center justify-center text-center h-full relative">
        <Button
          variant="empty"
          className="absolute right-0 size-10"
          tag="a"
          title="بازگشت به صفحه اصلی"
          href={routes.HOME}>
          <LucidIcon name="arrow-right" className="size-6" />
        </Button>
        <h1 className="text-xl font-bold">
          {pathname === routes.SIGN_IN ? 'ورود' : 'ثبت نام'}
        </h1>
      </div>
    </header>
  );
};

AuthHeader.displayName = 'AuthHeader';
