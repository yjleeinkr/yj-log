import Image from 'next/image';
import Link from 'next/link';
import { FcCalendar } from 'react-icons/fc';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getPostContents } from '@/service/posts';
import MarkdownRenderer from '@/components/MarkdownRenderer';

type ParamsProps = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: ParamsProps) {
  const { postList, markdown } = await getPostContents(slug);
  const { prev, current, next } = postList;
  return (
    <article className="max-w-[95%] md:max-w-[85%] xl:max-w-[80%] m-zero-auto my-5 sm:my-10 h-full bg-lightgrey rounded-lg overflow-clip">
      <Image
        src={`/img/posts/${current.path}.png`}
        alt="thumbnail"
        width={400}
        height={100}
        className="object-cover w-full h-[20vh] sm:h-[25vh] lg:h-[35vh]"
      />
      <main className="px-5 py-1">
        <p className="flex items-center justify-end text-sm text-secondary py-2">
          <FcCalendar />
          <time className="px-1">{current.date.toString()}</time>
        </p>
        <div className="py-3">
          <h1 className="text-3xl font-bold">{current.title}</h1>
          <p className="text-sm font-medium py-1">{current.description}</p>
          <hr className="border-0 border-b-4 w-[20%] mt-2 border-highlight" />
        </div>
        <MarkdownRenderer markdown={markdown} />
      </main>
      <div className="flex w-full justify-between items-center">
        <Link href={`/posts/${prev.path}`} className={`relative text-center w-[50%] p-10`}>
          <div className={`bg-[url(/img/posts/${prev.path}.png)] w-full h-full`}></div>
          <FaArrowLeft className="absolute left-10 top-[40%] text-highlight text-3xl" />
          <h2 className="font-bold text-lg">{prev.title}</h2>
          <p className="text-xs">{prev.description}</p>
        </Link>
        <Link
          href={`/posts/${next.path}`}
          className={`relative text-center w-[50%] p-10 bg-[url(/img/posts/${next.path}.png)]`}
        >
          <h2 className="font-bold text-lg">{next.title}</h2>
          <p className="text-xs">{next.description}</p>
          <FaArrowRight className="absolute right-10 top-[40%] text-highlight text-3xl" />
        </Link>
      </div>
    </article>
  );
}
