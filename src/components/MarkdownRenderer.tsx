'use client';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { PostContents } from '@/service/posts';
import styles from './MarkdownRenderer.module.css';

export default function MarkdownRenderer({ markdown }: { markdown: PostContents['markdown'] }) {
  return markdown ? (
    <ReactMarkdown
      children={markdown}
      className={`${styles.markdown} pb-20`}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              style={nightOwl}
              PreTag="div"
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        del: ({ node, ...props }) => (
          <u
            style={{
              textDecorationColor: '#00c6a0',
              textUnderlineOffset: '5px',
              textDecorationStyle: 'wavy',
              textDecorationThickness: '2px',
            }}
            {...props}
          />
        ),
        img: image => {
          return (
            <Image
              src={image.src || ''}
              alt={image.alt || ''}
              width={400}
              height={400}
              className="object-cover mx-auto py-5"
            />
          );
        },
      }}
    />
  ) : (
    <></>
  );
}
