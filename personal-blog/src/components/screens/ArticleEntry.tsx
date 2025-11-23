/**
 * 文章条目组件
 *
 * 支持表世界（surface）和里世界（inner）两种样式
 */

import Link from 'next/link';
import type { Article } from '@/services/notion';

interface ArticleEntryProps {
  article: Article;
  index: number;
  variant: 'surface' | 'inner';
}

/**
 * 格式化日期为 YYYY.MM.DD
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export function ArticleEntry({ article, index, variant }: ArticleEntryProps) {
  const isSurface = variant === 'surface';
  const indexStr = String(index).padStart(2, '0');

  return (
    <article className={`article-item group ${isSurface ? '' : ''}`}>
      {/* 序号和日期 */}
      <div
        className="font-mono"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
          fontSize: '10px',
          color: isSurface ? '#999' : '#555',
          borderBottom: '1px solid',
          borderColor: isSurface ? 'transparent' : 'rgba(255,255,255,0.05)',
          paddingBottom: '0.5rem',
        }}
      >
        <span style={{ color: isSurface ? '#D74B4B' : '#C7B396' }}>
          {isSurface ? `${indexStr}.` : `DREAM.${indexStr}`}
        </span>
        <span>{isSurface ? formatDate(article.publishedAt) : (article.titleEn ? 'SMOKE' : 'VOID')}</span>
      </div>

      {/* 标题 */}
      <Link href={`/posts/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2
          className="entry-title hover-target"
          style={{
            fontSize: isSurface ? '1.5rem' : '1.875rem',
            fontWeight: isSurface ? 500 : 300,
            marginBottom: isSurface ? '1rem' : '1.5rem',
            lineHeight: 1.4,
            color: isSurface ? 'inherit' : '#E6E8EB',
          }}
        >
          {article.title}
          {article.titleEn && (
            <>
              <br />
              <span
                style={{
                  fontStyle: 'italic',
                  fontSize: isSurface ? '1rem' : '1.125rem',
                  color: isSurface ? '#666' : '#C7B396',
                }}
              >
                {article.titleEn}
              </span>
            </>
          )}
        </h2>
      </Link>

      {/* 摘要 */}
      <p
        style={{
          fontSize: '0.75rem',
          color: isSurface ? '#555' : '#8FAAB0',
          lineHeight: 1.8,
          textAlign: 'justify',
          opacity: isSurface ? 1 : 0.8,
        }}
      >
        {article.excerpt}
      </p>
    </article>
  );
}
