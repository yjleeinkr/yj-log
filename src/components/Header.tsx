'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type menuName = 'about' | 'posts' | 'contact';
type menuTypes = { name: menuName; path: `/${menuName}` };

const menus: menuTypes[] = [
  { name: 'about', path: '/about' },
  { name: 'posts', path: '/posts' },
  { name: 'contact', path: '/contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex p-2 sm:p-4 justify-between max-w-[90%] lg:max-w-[85%] xl:max-w-[75%] m-zero-auto">
      <h1 className="text-base sm:text-lg font-bold whitespace-nowrap">
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
