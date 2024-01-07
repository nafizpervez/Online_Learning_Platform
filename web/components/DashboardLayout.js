import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ActiveMenuLink = ({ children, href }) => {
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <Link
      href={href}
      className={`hover:bg-gray-100 p-2 rounded block text-sm ${active ? 'text-black font-semibold' : 'text-gray-500'
        }`}
    >
      {children}
    </Link>
  );
};

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex gap-8">
      <aside className="flex-[2]">
        <nav>
          <ul className="grid gap-3">

            <li>
              <ActiveMenuLink href="/dashboard/courses">
                All Courses
              </ActiveMenuLink>
            </li>
            <li>
              <ActiveMenuLink href="/dashboard/enrollments">
                All Enrollments
              </ActiveMenuLink>
            </li>
            <li>
              <ActiveMenuLink href="/dashboard/settings">
                Settings
              </ActiveMenuLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="bg-gray-100 flex-[8] p-4 rounded min-h-[300px]">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
