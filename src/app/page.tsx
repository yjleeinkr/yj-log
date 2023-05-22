import Profile from '@/components/Profile';
import { getFeaturedOrNot } from '@/service/posts';
import FeaturedPosts from '@/components/FeaturedPosts';

export default async function Home() {
  const posts = await getFeaturedOrNot(true);
  return (
    <div>
      <Profile />
      <FeaturedPosts posts={posts} />
    </div>
  );
}
