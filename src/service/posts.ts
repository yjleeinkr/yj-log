import path from 'path';
import { promises as fs } from 'fs';

export type Category = 'all posts' | 'my story' | 'javascript' | 'frontend' | 'backend';

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

export async function getMarkdown(filename: string) {
  const filePath = path.join(process.cwd(), 'data/posts', `${filename}.md`);
  const markdown = await fs.readFile(filePath, 'utf-8');
  return markdown;
}

export async function getPost(filename: string) {
  const posts = await getPosts();
  return posts.find(post => post.path === filename);
}

export type PostContents = {
  post: PostProps | undefined;
  markdown: string;
};

export async function getPostContents(filename: string): Promise<PostContents> {
  const [post, markdown] = await Promise.all([getPost(filename), getMarkdown(filename)]);
  return { post, markdown };
}
