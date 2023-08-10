import { getPostContents } from '@/service/posts';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import CurrentPostDetail from '@/components/CurrentPostDetail';
import AdjacentPost from '@/components/AdjacentPostCard';

type ParamsProps = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: ParamsProps) {
  const { postList, markdown } = await getPostContents(slug);
  const { prev, current, next } = postList;
  return (
    <article className="my-5 sm:my-10 h-full rounded-lg overflow-clip">
      <main className="px-5 py-1">
        <CurrentPostDetail current={current} />
        <MarkdownRenderer markdown={markdown} />
      </main>
      <div className="flex flex-col justify-between gap-4 w-full border-t-[1px] px-2 py-4">
        <AdjacentPost post={prev} isPrev={true} />
        <AdjacentPost post={next} isPrev={false} />
      </div>
    </article>
  );
}
