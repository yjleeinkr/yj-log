import { PostProps } from '@/service/posts';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type Props = {
  post: PostProps;
  type: 'prev' | 'next';
};

const ICON_CLASS = 'text-highlight text-2xl sm:text-4xl m-3 group-hover:text-5xl transition-all';

export default function AdjacentPostCard({ post: { path, title, description }, type }: Props) {
  return (
    <Link href={`/posts/${path}`} className="relative w-full bg-primary max-h-56 mt-24">
      <Image src={`/img/posts/${path}.png`} alt={title} width={100} height={100} className="w-full opacity-40" />
      <div className="group absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full flex justify-around items-center">
        {type === 'prev' && <FaArrowLeft className={ICON_CLASS} />}
        <div className="w-full text-center text-white">
          <h2 className="font-bold text-[11px] sm:text-2xl truncate">{title}</h2>
          <p className="text-xs hidden sm:inline-block sm:text-md truncate">{description}</p>
        </div>
        {type === 'next' && <FaArrowRight className={ICON_CLASS} />}
      </div>
    </Link>
  );
}
