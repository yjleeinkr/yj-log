import { PostProps } from '@/service/posts';
import Tags from '@/components/Tags';

export default function CurrentPostDetail({ current }: { current: PostProps }) {
  return (
    <div className="py-5 border-b-2 border-b-lightgrey w-full mt-2 mb-6">
      <nav className="flex items-center justify-between mb-3">
        <span className="py-1 px-[3px] text-sm border-b-[1px] border-primary inline-block">{current.category}</span>
        <Tags tags={current.tags} />
      </nav>
      <h1 className="text-3xl font-bold">{current.title}</h1>
      <p className="text-base font-light pt-2 pb-4">{current.description}</p>
      <div className="flex items-center gap-2 ">
        <span className="text-sm font-light">이연정</span>
        <span className="text-sm font-light text-secondary">|</span>
        <time className="text-sm font-light text-secondary">{current.date.toString()}</time>
      </div>
    </div>
  );
}
