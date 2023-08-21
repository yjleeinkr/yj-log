import { notFound } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import CurrentPostDetail from '@/components/CurrentPostDetail';
import AdjacentPost from '@/components/AdjacentPostCard';
import { getFeaturedOrNot, getPosts, getPostContents, PostProps } from '@/service/posts';
import Comment from '@/components/Comment';

type ParamsProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params: { slug } }: ParamsProps) {
  const posts = await getPosts();
  const post = posts.find((post: PostProps) => post.path === slug);
  if (!post)
    return {
      title: `Not Found`,
    };

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params: { slug } }: ParamsProps) {
  const { postList, markdown } = await getPostContents(slug);
  if (!postList || !markdown) notFound();
  const { prev, current, next } = postList;
  return (
    <article className="my-5 sm:my-10 h-full rounded-lg overflow-clip">
      <main className="px-5 py-1">
        <CurrentPostDetail current={current} />
        <MarkdownRenderer markdown={markdown} />
      </main>
      <Comment />
      <div className="flex flex-col justify-between gap-4 w-full border-t-[1px] px-2 py-4">
        <AdjacentPost post={prev} isPrev={true} />
        <AdjacentPost post={next} isPrev={false} />
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getFeaturedOrNot(true);
  return posts.map(post => ({
    slug: post.path,
  }));
}
