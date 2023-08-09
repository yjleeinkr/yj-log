import PostCard from '@/components/PostCard';
import { PostProps } from '@/service/posts';

type Props = {
  posts: PostProps[];
};
export default function PostGrid({ posts }: Props) {
  return (
    <ul className="flex-grow">
      {posts.map((post, i) => (
        <li>
          <PostCard post={post} key={i} />
        </li>
      ))}
    </ul>
  );
}
