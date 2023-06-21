import { AiFillGithub } from 'react-icons/ai';
import { SiTistory } from 'react-icons/si';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import EmailForm from '@/components/EmailForm';

const LINKS = [
  { icon: <AiFillGithub />, url: 'https://github.com/yjleeinkr/', class: 'py-2 px-3 text-4xl' },
  { icon: <SiTistory />, url: 'https://yjleekr.tistory.com/', class: 'py-2 px-3 text-3xl' },
  {
    icon: <BsFillPersonLinesFill />,
    url: 'https://yjleeinkr.github.io/resume',
    class: 'py-2 px-3 text-3xl',
  },
];

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
          {LINKS.map(link => (
            <a href={link.url} className={link.class} target="_blank" rel="noreferrer">
              {link.icon}
            </a>
          ))}
        </ul>
      </div>
      <div>
        <h1 className="text-lg font-bold pt-7">Or Send me an email here 🤍</h1>
        <EmailForm />
      </div>
    </main>
  );
}
