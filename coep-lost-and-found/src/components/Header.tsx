import Link from 'next/link';

const Header = () => {
  return (
    <header className="border-b border-[var(--border-color)]">
      <div className="container mx-auto flex justify-between items-center py-5">
        <Link href="/" className="text-2xl font-bold text-[var(--primary-text)]">
          COEP Lost & Found
        </Link>
        <nav>
          <ul className="flex items-center space-x-10">
            <li>
              <Link href="/report-lost" className="text-[var(--secondary-text)] hover:text-[var(--primary-text)] transition-colors">
                Report Lost
              </Link>
            </li>
            <li>
              <Link href="/report-found" className="text-[var(--secondary-text)] hover:text-[var(--primary-text)] transition-colors">
                Report Found
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
