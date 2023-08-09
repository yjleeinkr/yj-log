'use client';
import { useState } from 'react';
import { PostProps } from '@/service/posts';
import PostGrid from './PostGrid';
import Categories from './Categories';

type Props = {
  posts: PostProps[];
  categories: string[];
};

const ALL_POSTS = 'All Posts';

export default function PostList({ posts, categories }: Props) {
  const [selected, setSelected] = useState(ALL_POSTS);
  const filtered = selected === ALL_POSTS ? posts : posts.filter(post => post.category === selected);

  return (
    <div className="flex flex-col-reverse gap-10 sm:flex-row sm:justify-between p-7 sm:p-10">
      <PostGrid posts={filtered} />
      <Categories categories={[ALL_POSTS, ...categories]} selected={selected} onClick={setSelected} />
    </div>
  );
}
