import Profile from '@/components/Profile';
import FeaturedPosts from '@/components/FeaturedPosts';
import PostsSlide from '@/components/PostsSlide';

export default async function Home() {
  return (
    <div className="max-w-[90%] lg:max-w-[85%] xl:max-w-[75%] m-zero-auto">
      <Profile />
      {/* @ts-expect-error Server Component */}
      <FeaturedPosts />
      {/* @ts-expect-error Server Component */}
      <PostsSlide />
    </div>
  );
}
