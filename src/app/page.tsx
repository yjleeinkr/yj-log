// import Profile from '@/components/Profile';
import FeaturedPosts from '@/components/FeaturedPosts';

export default function Home() {
  return (
    <>
      {/* <Profile /> */}
      {/* @ts-expect-error Server Component */}
      <FeaturedPosts />
    </>
  );
}
