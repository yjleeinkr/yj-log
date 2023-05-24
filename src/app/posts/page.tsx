import { getPosts } from '@/service/posts';
import PostList from '@/components/PostList';

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] m-zero-auto">
      <PostList posts={posts} />
    </div>
  );
}
