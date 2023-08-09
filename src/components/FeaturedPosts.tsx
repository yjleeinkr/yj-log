import { getFeaturedOrNot } from '@/service/posts';
import PostGrid from './PostGrid';

export default async function FeaturedPosts() {
  const posts = await getFeaturedOrNot(true);
  return (
    <section className="px-4 py-8">
      <h1 className="text-xl font-semibold py-3 px-2 border-b-[1px] border-b-primary">All Posts</h1>
      <PostGrid posts={posts} />
    </section>
  );
}
