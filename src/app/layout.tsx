import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const notoKR = Noto_Sans_KR({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

export const metadata = {
  title: 'yj log',
  description: '주니어 프론트엔드 개발자의 커가는 과정을 남기는 블로그입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={notoKR.className}>
      <body className="flex flex-col px-4">
        <Header />
        <main className="grow w-full lg:w-[70%] max-w-screen-md mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
