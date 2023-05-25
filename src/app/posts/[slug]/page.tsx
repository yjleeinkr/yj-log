import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Image from 'next/image';
import { getPostContents } from '@/service/posts';
type ParamsProps = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: ParamsProps) {
  const { post, markdown } = await getPostContents(slug);
  return (
    <article>
      <Image src={`/img/posts/${post?.path}.png`} alt="thumbnail" width={500} height={100} />
      <h1>{post?.title}</h1>
      <p>{post?.description}</p>
      <span>{post?.date}</span>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </article>
  );
}
