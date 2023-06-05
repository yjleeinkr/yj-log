import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const notoKR = Noto_Sans_KR({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

export const metadata = {
  title: "yj's dev-log",
  description: '주니어 프론트엔드 개발자의 커가는 과정을 남기는 블로그입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={notoKR.className}>
      <body className="flex flex-col max-w-screen-2xl mx-auto">
        {/* <div className="h-auto min-h-[100vh]"> */}
        <Header />
        <main className="grow">{children}</main>
        {/* </div> */}
        <Footer />
      </body>
    </html>
  );
}
