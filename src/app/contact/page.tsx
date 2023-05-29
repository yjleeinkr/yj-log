import { AiFillGithub } from 'react-icons/ai';
import { SiTistory } from 'react-icons/si';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import Link from 'next/link';
import EmailForm from '@/components/EmailForm';

export default function ContactPage() {
  return (
    <main className="text-center max-w-[100%] lg:max-w-[85%] xl:max-w-[75%] m-zero-auto p-5">
      <div>
        <h1 className="text-xl font-bold">Contact me</h1>
        <p className="text-sm py-1 font-light">
          <HiOutlineMail className="inline-block px-1 text-xl" />
          yjleeinkr@gmail.com
        </p>
        <ul className="flex items-center justify-center">
          <li className="py-2 px-3 text-4xl">
            <Link href="https://github.com/yjleeinkr/" target="_blank">
              <AiFillGithub />
            </Link>
          </li>
          <li className="py-2 px-3 text-3xl">
            <Link href="https://yjleekr.tistory.com/" target="_blank">
              <SiTistory />
            </Link>
          </li>
          <li className="py-2 px-3 text-3xl">
            <Link href="https://yjleeinkr.github.io/resume" target="_blank">
              <BsFillPersonLinesFill />
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="text-lg font-bold pt-7">Or Send me an email here 🤍</h1>
        <EmailForm />
      </div>
    </main>
  );
}
