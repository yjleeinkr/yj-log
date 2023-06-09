import { getPosts } from '@/service/posts';
import PostList from '@/components/PostList';

export default async function PostsPage() {
  const posts = await getPosts();
  const categories = [...new Set(posts.map(post => post.category))];

  return <PostList posts={posts} categories={categories} />;
}
