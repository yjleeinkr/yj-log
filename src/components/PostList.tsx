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
    <div className="flex py-7 sm:py-10 flex-col-reverse sm:flex-row sm:justify-between">
      <main className="w-full sm:w-[80%]">
        {postList.map((post, i) => (
          <PostCard post={post} version="md" key={`${post.category}_${i}`} />
        ))}
      </main>
      <nav className="sm:w-[8%] sm:text-center">
        <h2 className="underline underline-offset-8 decoration-highlight decoration-2 py-3 text-xs sm:text-sm">
          Category
        </h2>
        <ul className="flex sm:inline-block justify-between">
          {categories.map(cate => (
            <li
              key={cate}
              onClick={() => {
                setCategory(cate);
              }}
              className={`${
                cate === category ? 'text-highlight' : 'text-primary'
              } cursor-pointer px-1 pb-2 sm:px-0 sm:py-0.5 text-xs sm:text-sm whitespace-nowrap`}
            >
              {cate}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
