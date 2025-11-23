/**
 * 文章正文组件
 *
 * 渲染 Markdown 内容
 * 设计：舒适的阅读体验，思源宋体
 */

import styles from './styles.module.css';

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  // 简单的 Markdown 到 HTML 转换
  // 未来可以替换为 MDX 或更完整的 Markdown 解析器
  const htmlContent = markdownToHtml(content);

  return (
    <div
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

/**
 * 简易 Markdown 转 HTML
 *
 * 支持：段落、标题、列表、引用、代码块
 * 设计原则：够用就好，保持简单
 */
function markdownToHtml(markdown: string): string {
  if (!markdown) return '';

  return markdown
    // 代码块
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    // 行内代码
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 标题
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // 引用
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // 无序列表
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // 有序列表
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // 分隔线
    .replace(/^---$/gm, '<hr />')
    // 粗体
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // 斜体
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // 段落 (双换行)
    .replace(/\n\n/g, '</p><p>')
    // 单换行
    .replace(/\n/g, '<br />')
    // 包裹整个内容
    .replace(/^([\s\S]+)$/, '<p>$1</p>')
    // 清理多余的空 p 标签
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[123]>)/g, '$1')
    .replace(/(<\/h[123]>)<\/p>/g, '$1')
    .replace(/<p>(<blockquote>)/g, '$1')
    .replace(/(<\/blockquote>)<\/p>/g, '$1')
    .replace(/<p>(<pre>)/g, '$1')
    .replace(/(<\/pre>)<\/p>/g, '$1')
    .replace(/<p>(<hr \/>)/g, '$1')
    .replace(/(<hr \/>)<\/p>/g, '$1')
    .replace(/<p>(<li>)/g, '<ul>$1')
    .replace(/(<\/li>)<\/p>/g, '$1</ul>');
}
