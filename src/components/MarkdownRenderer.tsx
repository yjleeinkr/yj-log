'use client';
import { PostContents } from '@/service/posts';
import ReactMarkdown from 'react-markdown';
import styles from './MarkdownRenderer.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

export default function MarkdownRenderer({ markdown }: { markdown: PostContents['markdown'] }) {
  return (
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
              style={vscDarkPlus}
              PreTag="div"
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}
