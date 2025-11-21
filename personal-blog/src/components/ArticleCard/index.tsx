/**
 * ArticleCard 组件 - 占位符实现
 *
 * 职责：展示文章卡片（标题、摘要、元信息）
 * 状态：占位符，仅有基础结构，等待视觉层实现
 *
 * 使用方式：
 * <ArticleCard
 *   title="文章标题"
 *   excerpt="文章摘要..."
 *   publishedAt="2024-01-15T10:30:00Z"
 *   txHash="0x..."
 *   slug="article-slug"
 * />
 */

import Link from 'next/link';
import { formatDate } from '@/utils/formatDate';
import type { ArticleCardProps } from './types';
import styles from './styles.module.css';

export function ArticleCard({
  title,
  excerpt,
  publishedAt,
  txHash,
  slug,
  coverImage,
  tags = [],
  readingTime,
  onClick,
  className = '',
}: ArticleCardProps) {
  const formattedDate = formatDate(publishedAt);
  const shortHash = `${txHash.slice(0, 6)}...${txHash.slice(-4)}`;

  const content = (
    <article className={`${styles.card} ${className}`}>
      {/* 封面图片 (可选) */}
      {coverImage && (
        <div className={styles.cover}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverImage} alt={title} className={styles.coverImage} />
        </div>
      )}

      <div className={styles.content}>
        {/* 标题 */}
        <h2 className={styles.title}>{title}</h2>

        {/* 摘要 */}
        <p className={styles.excerpt}>{excerpt}</p>

        {/* 元信息区域 */}
        <div className={styles.meta}>
          <time className={styles.date} dateTime={publishedAt}>
            {formattedDate}
          </time>

          {readingTime && (
            <span className={styles.readingTime}>{readingTime} 分钟阅读</span>
          )}
        </div>

        {/* 标签 */}
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 区块链 Hash - 印章 */}
        <div className={styles.hash}>
          <span className={styles.hashLabel}>链上存证</span>
          <code className={styles.hashValue}>{shortHash}</code>
        </div>
      </div>
    </article>
  );

  // 如果有自定义点击事件，使用 div + onClick
  if (onClick) {
    return (
      <div onClick={onClick} style={{ cursor: 'pointer' }}>
        {content}
      </div>
    );
  }

  // 默认使用 Link 跳转到文章详情
  return <Link href={`/posts/${slug}`} className={styles.link}>{content}</Link>;
}

export type { ArticleCardProps } from './types';
