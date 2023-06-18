import PostCard from './PostCard';
import { getFeaturedOrNot } from '@/service/posts';
import SingleCarousel from './SingleCarousel';

export default async function PostsSlide() {
  const posts = await getFeaturedOrNot(false);

  return (
    <div className="mt-10 mb-20 px-5 md:px-20">
      <h1 className="text-lg font-semibold py-3">More Posts</h1>
      <SingleCarousel>
        {posts.map((post, i) => (
          <PostCard post={post} key={`more_posts_${i}`} />
        ))}
      </SingleCarousel>
    </div>
  );
}
