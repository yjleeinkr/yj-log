'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type menuName = 'about' | 'Posts' | 'contact' | 'My Log';
type menuTypes = { name: menuName; path: string };

const menus: menuTypes[] = [
  // { name: 'about', path: '/about' },
  { name: 'Posts', path: '/posts' },
  // { name: 'contact', path: '/contact' },
  { name: 'My Log', path: '/mylog' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex px-4 py-5 justify-between w-full lg:w-[70%] max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold whitespace-nowrap">
        <Link href="/">
          yj Log <span className="text-highlight">+</span>
        </Link>
      </h1>
      <nav>
        {menus.map((menu, i) => (
          <Link
            href={menu.path}
            key={`menu_${i}`}
            className={`${
              pathname === menu.path ? 'text-highlight' : 'text-primary'
            } p-2 text-sm sm:text-base transition-all hover:text-highlight hover:duration-100`}
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
