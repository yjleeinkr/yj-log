import { PostProps } from '@/service/posts';
import Link from 'next/link';

export default function AdjacentPostCard({ post, isPrev }: { post: PostProps; isPrev: boolean }) {
  return (
    <Link
      href={`/posts/${post.path}`}
      className="flex items-center gap-3 border-lightgrey rounded-lg border-[1px] px-2 py-3 hover:transition-all hover:duration-300 hover:shadow-highlight hover:scale-[1.01]"
    >
      <span className="text-sm font-light">{isPrev ? '이전 글' : '다음 글'}</span>
      <div>
        <h2 className="font-medium text-lg">{post.title}</h2>
        <p className="text-xs">{post.description}</p>
      </div>
    </Link>
  );
}
