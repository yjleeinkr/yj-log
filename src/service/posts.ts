import path from 'path';
import { promises as fs } from 'fs';

type Category = 'my story' | 'javascript' | 'backend';

export type PostProps = {
  title: string;
  description: string;
  date: string;
  category: Category;
  path: string;
  featured: boolean;
};

export async function getPosts(): Promise<PostProps[]> {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function getFeaturedOrNot(isFeatured: PostProps['featured']): Promise<PostProps[]> {
  const posts = await getPosts();
  return isFeatured ? posts.filter(post => post.featured) : posts.filter(post => !post.featured);
}
