export const MainHeader = () => {
  return (
    <header className="border-solid border-b border-b-gray-200">
      <div className="container">
        <nav className="flex items-center justify-center h-20">
          <ul className="flex items-center gap-5">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

MainHeader.displayName = 'MainHeader';
