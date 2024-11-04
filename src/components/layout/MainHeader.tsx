export const MainHeader = () => {
  return (
    <header className="border-solid border-b border-b-gray-200 h-18 fixed top-0 inset-x-0 w-full z-10">
      <div className="container h-full">
        <h1 className="text-3xl font-bold flex items-center justify-center h-full">
          محاسبه خمس سال
        </h1>
      </div>
    </header>
  );
};

MainHeader.displayName = 'MainHeader';
