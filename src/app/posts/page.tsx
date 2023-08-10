import { getPosts } from '@/service/posts';
import PostList from '@/components/PostList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All posts',
  description: '프론트엔드 개발자 관련 포스트',
};

export default async function PostsPage() {
  const posts = await getPosts();
  const categories = [...new Set(posts.map(post => post.category))];

  return <PostList posts={posts} categories={categories} />;
}
