import Profile from '@/components/Profile';
import FeaturedPosts from '@/components/FeaturedPosts';
import PostsSlide from '@/components/PostsSlide';

export default function Home() {
  return (
    <>
      {/* <Profile /> */}
      {/* @ts-expect-error Server Component */}
      <FeaturedPosts />
    </>
  );
}
