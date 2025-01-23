import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import MDXComponents from '@theme/MDXComponents';
import styles from './MarkdownContent.module.css';


const MarkdownBubble: React.FC<{ content: string }> = ({ content }) => {
   return (
     <div >
       <ReactMarkdown
         remarkPlugins={[remarkGfm]}
         rehypePlugins={[rehypeRaw]}
         components={{
           // 使用 Docusaurus 的 MDX 组件
           ...MDXComponents,
         }}
       >
         {content}
       </ReactMarkdown>
     </div>
   );
 };

 export default MarkdownBubble;