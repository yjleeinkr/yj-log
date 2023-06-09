'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PostProps } from '@/service/posts';

export default function PostCard({ post }: { post: PostProps }) {
  const { title, description, date, category, path } = post;

  return (
    <Link
      className="rounded-md w-full shadow-card overflow-clip cursor-pointer m-1 inline-block hover:shadow-card-pop hover:transition-all hover:duration-500 hover:scale-[1.005]"
      href={`/posts/${path}`}
    >
      <Image src={`/img/posts/${path}.png`} alt={path} width={400} height={100} className="object-contain w-[100%]" />
      <section className="py-2 px-3 flex flex-col items-center">
        <time className="self-end text-[0.6em] sm:text-xs text-secondary font-light">{date.toString()}</time>
        <div className="flex flex-col items-center w-full">
          <h2 className="text-[0.8em] sm:text-sm font-medium py-1 w-full truncate text-center">{title}</h2>
          <p className="text-[0.6em] sm:text-xs font-light w-full truncate text-center">{description}</p>
          <span className="text-[0.6em] sm:text-xs rounded-lg bg-point px-2 py-0.5 my-3">{category}</span>
        </div>
      </section>
    </Link>
  );
}
