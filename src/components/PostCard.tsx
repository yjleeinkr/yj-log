'use client';

import Link from 'next/link';
import { PostProps } from '@/service/posts';
import Tags from './Tags';

export default function PostCard({ post }: { post: PostProps }) {
  const { title, description, date, category, path, tags } = post;

  return (
    <Link
      className="group w-full cursor-pointer m-1 inline-block border-b-[1px] border-b-lightgrey "
      href={`/posts/${path}`}
    >
      <section className="flex flex-col justify-center w-full py-7 px-4 ">
        <h2 className="text-xl relative font-medium w-fit truncate after:block after:absolute after:w-0 after:content-[''] after:h-2 after:left-0 after:bottom-0 after:bg-point after:opacity-40 group-hover:after:w-full group-hover:after:transition-[width] group-hover:duration-600">
          {title}
        </h2>
        <p className="text-sm font-light w-full truncate pt-1 pb-4">{description}</p>
        <div className="flex items-center gap-4">
          <time className="text-xs text-secondary font-light">{date.toString()}</time>
          <Tags tags={tags} />
        </div>
      </section>
    </Link>
  );
}
