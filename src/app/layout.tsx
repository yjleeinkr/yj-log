import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

const notoKR = Noto_Sans_KR({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'yj log',
    template: `%s | yj log`,
  },
  description: '주니어 프론트엔드 개발자의 커가는 과정을 남기는 블로그입니다.',
  authors: [{ name: 'yjleeinkr', url: 'https://yjleeinkr.github.io/resume/' }],
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
