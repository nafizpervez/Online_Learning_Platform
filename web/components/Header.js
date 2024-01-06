import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const menuItems = [
  { label: `Home`, url: `/` },
  { label: `Dashboard`, url: `/dashboard/courses` },
  { label: `Course`, url: `/create_course` },
  { label: `Enrollment`, url: `/create_enrollment` },
];

const ActiveMenuLink = ({ children, href }) => {
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <Link
      href={href}
      className={`hover:bg-gray-100 p-2 rounded block ${active ||
        (href.startsWith('/dashboard') &&
          pathname.startsWith('/dashboard'))
        ? 'text-black font-semibold'
        : 'text-gray-500'
        }`}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const [search, setSearch] = useState('');

  return (
    <header className="flex flex-col gap-5">
      <div className="py-4 flex items-center">
        <Link href="/">
          <Image
            width={36}
            height={36}
            src="/favicon.ico"
            className="w-8 md:w-9"
            alt="logo"
          />
        </Link>
        <nav className="ml-8">
          <ul className="flex flex-wrap gap-x-8 text-gray-900">
            {menuItems.map(({ url, label }, index) => (
              <li key={index}>
                <ActiveMenuLink href={url}>{label}</ActiveMenuLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        placeholder="Search..."
      /> */}
    </header>
  );
};

export default Header;
