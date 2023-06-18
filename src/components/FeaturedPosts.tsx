import { getFeaturedOrNot } from '@/service/posts';
import PostGrid from './PostGrid';

export default async function FeaturedPosts() {
  const posts = await getFeaturedOrNot(true);
  return (
    <section className="px-5 md:px-20">
      <h1 className="text-lg font-semibold py-3">Featured Posts</h1>
      <PostGrid posts={posts} />
    </section>
  );
}
