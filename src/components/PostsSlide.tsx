'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PostCard from './PostCard';
import { PostProps } from '@/service/posts';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};

export default function PostsSlide({ posts }: { posts: PostProps[] }) {
  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg font-semibold py-3">More Posts</h1>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        pauseOnHover={true}
        centerMode={true}
        removeArrowOnDeviceType={['mobile']}
      >
        {posts.map((post, i) => (
          <PostCard post={post} key={`more_posts_${i}`} />
        ))}
      </Carousel>
    </div>
  );
}
