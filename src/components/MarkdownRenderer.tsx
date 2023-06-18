'use client';
import { PostContents } from '@/service/posts';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

export default function MarkdownRenderer({ markdown }: { markdown: PostContents['markdown'] }) {
  return (
    <ReactMarkdown
      children={markdown}
      className="prose max-w-none"
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              style={vscDarkPlus}
              PreTag="div"
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        img: image => (
          <Image
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={350}
            className="w-full max-h-60 object-cover"
          />
        ),
      }}
    />
  );
}
