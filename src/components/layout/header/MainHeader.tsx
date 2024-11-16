import { MainHeaderSidebarToggle, MainHeaderTitle, MainHeaderUser } from '@components';

export const MainHeader = () => {
  return (
    <header className="border-solid border-b border-b-gray-100 bg-gray-50 h-18 fixed top-0 w-full z-20">
      <div className="container max-w-2xl flex items-center justify-center text-center h-full relative">
        <MainHeaderSidebarToggle />
        <MainHeaderTitle />
        <MainHeaderUser />
      </div>
    </header>
  );
};

MainHeader.displayName = 'MainHeader';