'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PostProps } from '@/service/posts';

export default function PostCard({ post }: { post: PostProps }) {
  const { title, description, date, category, path } = post;
  const router = useRouter();

  return (
    <div
      className="rounded-md w-full sm:w-[48%] lg:w-[32%] shadow-card overflow-clip cursor-pointer m-1 inline-block hover:shadow-card-pop hover:transition-shadow hover:duration-500"
      onClick={() => router.push(`/posts/${path}`)}
    >
      <div className="">
        <Image src={`/img/posts/${path}.png`} alt={path} width={100} height={100} className="object-contain w-[100%]" />
      </div>
      <section className="py-2 px-3 text-center">
        <p className="text-right text-xs text-secondary font-light py-1">{date}</p>
        <div className="flex flex-col items-center">
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm font-light text-ellipsis overflow-hidden whitespace-nowrap w-full">{description}</p>
          <span className="text-xs rounded-lg bg-point px-2 py-0.5 my-3">{category}</span>
        </div>
      </section>
    </div>
  );
}
