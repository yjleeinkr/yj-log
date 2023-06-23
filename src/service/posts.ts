import path from 'path';
import { promises as fs } from 'fs';
import { cache } from 'react';

export type PostProps = {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
};

export const getPosts = cache(async (): Promise<PostProps[]> => {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data).sort((a: PostProps, b: PostProps) => {
    return new Date(a.date) < new Date(b.date) ? 1 : -1;
  });
});

export async function getFeaturedOrNot(isFeatured: PostProps['featured']): Promise<PostProps[]> {
  const posts = await getPosts();
  return isFeatured ? posts.filter(post => post.featured) : posts.filter(post => !post.featured);
}

export async function getMarkdown(filename: string) {
  const filePath = path.join(process.cwd(), 'data/posts', `${filename}.md`);
  const markdown = await fs.readFile(filePath, 'utf-8');
  return markdown;
}

export async function getPostList(filename: string) {
  try {
    const posts = await getPosts();
    const idx = posts.findIndex(post => post.path === filename);
    if (idx === -1) throw new Error(`This post doesn't exist`);
    const postList = {
      prev: posts[idx - 1] ?? posts[posts.length - 1],
      current: posts[idx],
      next: posts[idx + 1] ?? posts[0],
    };
    return postList;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export type PostList = {
  prev: PostProps;
  current: PostProps;
  next: PostProps;
};

export type PostContents = {
  postList: PostList | null;
  markdown: string | null;
};

export async function getPostContents(filename: string): Promise<PostContents> {
  try {
    const [postList, markdown] = await Promise.all([getPostList(filename), getMarkdown(filename)]);
    if (!postList) throw new Error(`This post doesn't exist`);
    return { postList, markdown };
  } catch (err) {
    console.log(err);
    return { postList: null, markdown: null };
  }
}
