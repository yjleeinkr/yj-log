import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/Header';

const notoKR = Noto_Sans_KR({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

export const metadata = {
  title: "yj's dev-log",
  description: '주니어 프론트엔드 개발자의 커가는 과정을 남기는 블로그입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={notoKR.className}>
        <div className="h-auto min-h-[100vh]">
          <Header />
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
