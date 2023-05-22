import './globals.css';
import { Inter, Noto_Sans_KR } from 'next/font/google';
import Link from 'next/link';

const notoKR = Noto_Sans_KR({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

export const metadata = {
  title: "yj's dev-log",
  description: '주니어 프론트엔드 개발자의 커가는 과정을 남기는 블로그입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={notoKR.className}>
        <header className="flex p-4 justify-between max-w-[90%] m-zero-auto">
          <h1 className="text-lg font-bold whitespace-nowrap">
            <Link href="/">
              yj Log <span className="text-highlight">+</span>
            </Link>
          </h1>
          <nav>
            <Link href="/about" className="p-2 text-base hover:text-highlight transition-all ease-in duration-100">
              about
            </Link>
            <Link href="/posts" className="p-2 text-base hover:text-highlight transition-all ease-in duration-100">
              posts
            </Link>
            <Link href="/contact" className="p-2 text-base hover:text-highlight transition-all ease-in duration-100">
              contact
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
