import Image from 'next/image';
import { PostProps } from '@/service/posts';
import Link from 'next/link';

export default function PostCard({ post, version }: { post: PostProps; version: 'sm' | 'md' }) {
  const { title, description, date, category, path } = post;

  return (
    <Link
      className={
        version === 'md'
          ? 'rounded-md w-full sm:w-[48%] lg:w-[32%] shadow-card overflow-clip cursor-pointer m-1 inline-block hover:shadow-card-pop hover:transition-all hover:duration-500 hover:scale-[1.005]'
          : 'rounded-md w-[96%] cursor-pointer shadow-card overflow-clip inline-block'
      }
      href={`/posts/${path}`}
    >
      <Image src={`/img/posts/${path}.png`} alt={path} width={400} height={100} className="object-contain w-[100%]" />
      <section className="py-2 px-3 text-center">
        <p className="text-right text-[0.6em] sm:text-xs text-secondary font-light">{date}</p>
        <div className="flex flex-col items-center">
          <h2 className="text-[0.8em] sm:text-sm font-medium py-1 truncate">{title}</h2>
          <p className="text-[0.6em] sm:text-xs font-light truncate w-full">{description}</p>
          <span className="text-[0.6em] sm:text-xs rounded-lg bg-point px-2 py-0.5 my-3">{category}</span>
        </div>
      </section>
    </Link>
  );
}
