import Profile from '@/components/Profile';
import { getFeaturedOrNot } from '@/service/posts';
import FeaturedPosts from '@/components/FeaturedPosts';
import PostsSlide from '@/components/PostsSlide';

export default async function Home() {
  const featuredPost = await getFeaturedOrNot(true);
  const allPosts = await getFeaturedOrNot(false);

  return (
    <div className="max-w-[90%] lg:max-w-[85%] xl:max-w-[75%] m-zero-auto">
      <Profile />
      <FeaturedPosts posts={featuredPost} />
      <PostsSlide posts={allPosts} />
    </div>
  );
}
