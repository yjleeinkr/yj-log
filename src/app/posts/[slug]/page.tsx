import Image from 'next/image';
import { getFeaturedOrNot, getPostContents, getPosts } from '@/service/posts';
import PostContent from '@/components/PostContent';
import AdjacentPostCard from '@/components/AdjacentPostCard';
import { notFound } from 'next/navigation';

type ParamsProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params: { slug } }: ParamsProps) {
  const posts = await getPosts();
  const post = posts.find(post => post.path === slug);
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
    <article className="max-w-[95%] md:max-w-[85%] xl:max-w-[80%] m-zero-auto my-5 sm:my-10 bg-lightgrey rounded-lg overflow-clip">
      {markdown && (
        <>
          <Image
            src={`/img/posts/${current.path}.png`}
            alt="thumbnail"
            width={400}
            height={100}
            className="object-cover w-full h-[20vh] sm:h-[25vh] lg:h-[35vh]"
          />
          <PostContent post={current} markdown={markdown} />
          <div className="flex w-full justify-between items-center">
            <AdjacentPostCard post={prev} type="prev" />
            <AdjacentPostCard post={next} type="next" />
          </div>
        </>
      )}
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getFeaturedOrNot(true);
  return posts.map(post => ({
    slug: post.path,
  }));
}
