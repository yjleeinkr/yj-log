import MarkdownRenderer from '@/components/MarkdownRenderer';
import { PostProps } from '@/service/posts';

type ContentProps = { post: PostProps; markdown: string };

export default function PostContent({ post: { date, title, description }, markdown }: ContentProps) {
  return (
    <section className="px-5 py-1">
      <p className="flex items-center justify-end text-sm text-secondary py-2">
        <span className="px-1">{date.toString()}</span>
      </p>
      <div className="py-3">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm font-medium py-1">{description}</p>
        <hr className="border-0 border-b-4 w-[20%] mt-2 border-highlight" />
      </div>
      <MarkdownRenderer markdown={markdown} />
    </section>
  );
}
