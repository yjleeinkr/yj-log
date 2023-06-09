import PostCard from '@/components/PostCard';
import { PostProps } from '@/service/posts';

type Props = {
  posts: PostProps[];
};
export default function PostGrid({ posts }: Props) {
  return (
    <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post, i) => (
        <li>
          <PostCard post={post} key={i} />
        </li>
      ))}
    </ul>
  );
}
