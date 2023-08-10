import { PostProps } from '@/service/posts';

export default function Tags({ tags }: { tags: PostProps['tags'] }) {
  return (
    <div className="flex gap-2">
      {tags?.map((tag, i) => (
        <span className="text-sm rounded-l text-point font-light" key={`${tag}-${i}`}>
          # {tag}
        </span>
      ))}
    </div>
  );
}
