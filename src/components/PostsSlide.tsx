import PostCard from './PostCard';
import MultiCarousel from './MultiCarousel';
import { getFeaturedOrNot } from '@/service/posts';

export default async function PostsSlide() {
  const posts = await getFeaturedOrNot(false);
  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg font-semibold py-3">More Posts</h1>
      <MultiCarousel>
        {posts?.map((post, i) => (
          <PostCard post={post} version="sm" key={`more_posts_${i}`} />
        ))}
      </MultiCarousel>
    </div>
  );
}
