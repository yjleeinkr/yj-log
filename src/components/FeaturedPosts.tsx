import { PostProps } from '@/service/posts';
import PostCard from '@/components/PostCard';

export default function FeaturedPosts({ posts }: { posts: PostProps[] }) {
  return (
    <section>
      <h1 className="text-lg font-semibold py-3">Featured Posts</h1>
      <div className="flex flex-wrap justify-center sm:justify-start">
        {posts.map((post, i) => (
          <PostCard post={post} version="md" key={i} />
        ))}
      </div>
    </section>
  );
}
