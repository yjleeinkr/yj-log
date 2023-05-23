import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import Link from 'next/link';

const notoKR = Noto_Sans_KR({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

export const metadata = {
  title: "yj's dev-log",
  description: '주니어 프론트엔드 개발자의 커가는 과정을 남기는 블로그입니다.',
};

const menus = [
  { name: 'about', path: '/about' },
  { name: 'posts', path: '/posts' },
  { name: 'contact', path: '/contact' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={notoKR.className}>
        <div className="h-auto min-h-[100vh]">
          <header className="flex p-4 justify-between max-w-[90%] lg:max-w-[85%] xl:max-w-[75%] m-zero-auto">
            <h1 className="text-lg font-bold whitespace-nowrap">
              <Link href="/">
                yj Log <span className="text-highlight">+</span>
              </Link>
            </h1>
            <nav>
              {menus.map((menu, i) => (
                <Link
                  href={menu.path}
                  className="p-2 text-base hover:text-highlight transition-all ease-in duration-100"
                >
                  {menu.name}
                </Link>
              ))}
            </nav>
          </header>
          {children}
        </div>
        <footer className="h-10 py-2  translate-y-[-50%]">
          <p className="text-center text-[3vw] sm:text-sm text-secondary">
            Be a better version of myself than yesterday | © 2023 YJ
          </p>
        </footer>
      </body>
    </html>
  );
}
