'use client';
import { useEffect, useState } from 'react';
import { PostProps, Category } from '@/service/posts';
import PostCard from './PostCard';

export const categories: Category[] = ['all posts', 'my story', 'frontend', 'backend', 'javascript'];

export default function PostList({ posts }: { posts: PostProps[] }) {
  const [category, setCategory] = useState('all posts');
  const [postList, setPostList] = useState<PostProps[]>([]);

  useEffect(() => {
    const filteredPosts = category === 'all posts' ? posts : posts.filter(post => post.category === category);
    setPostList(filteredPosts);
  }, [category]);

  return (
    <div className="flex justify-between py-10">
      <main className="w-[80%]">
        {postList.map((post, i) => (
          <PostCard post={post} version="md" key={`${post.category}_${i}`} />
        ))}
      </main>
      <nav className="w-[8%] text-center">
        <h2 className="underline underline-offset-8 decoration-highlight decoration-2 py-3">Category</h2>
        <ul>
          {categories.map(cate => (
            <li
              key={cate}
              onClick={() => {
                setCategory(cate);
              }}
              className={`${cate === category ? 'text-highlight' : 'text-primary'} cursor-pointer py-0.5`}
            >
              {cate}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
