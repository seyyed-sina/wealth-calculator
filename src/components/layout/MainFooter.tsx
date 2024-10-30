export const MainFooter = () => {
  return (
    <footer className="border-t border-solid border-t-gray-200 py-5">
      <div className="container text-center text-xs flex justify-center items-center gap-1">
        ساخته شده با ❤️ توسط
        <a
          href="https://linkedin.com/in/seyed-sina"
          target="_blank"
          rel="noreferrer">
          Seyed Sina
        </a>
      </div>
    </footer>
  );
};

MainFooter.displayName = 'MainFooter';
