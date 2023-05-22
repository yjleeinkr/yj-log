import Profile from '@/components/Profile';
import { getFeaturedOrNot } from '@/service/posts';
import FeaturedPosts from '@/components/FeaturedPosts';
import Carousel from '@/components/Carousel';

export default async function Home() {
  const posts = await getFeaturedOrNot(true);
  return (
    <div className="max-w-[90%] lg:max-w-[85%] xl:max-w-[75%] m-zero-auto">
      <Profile />
      <FeaturedPosts posts={posts} />
      <Carousel />
    </div>
  );
}
