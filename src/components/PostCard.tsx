import Image from 'next/image';
import { useRouter } from 'next/router';

type Category = 'my story' | 'javascript' | 'backend';

export type PostProps = {
  title: string;
  description: string;
  date: string;
  category: Category;
  path: string;
  featured: boolean;
};

export default function PostCard(Props: PostProps) {
  const { title, description, date, category, path, featured } = Props;
  const router = useRouter();

  return (
    <article className="drop-shadow-xl rounded-sm" onClick={() => router.push(`/posts/${path}`)}>
      <Image src={`/img/${path}`} alt={path} width="300" height="300" />
      <section className="p-2">
        <p className="text-right">{date}</p>
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-bold">{title}</h2>
          <p className="text-xs font-light">{description}</p>
          <span className="text-xs rounded-lg bg-point">{category}</span>
        </div>
      </section>
    </article>
  );
}
