/**
 * ArticleList 组件 - 占位符实现
 *
 * 职责：展示文章列表，处理空状态和分页
 * 状态：占位符，仅有基础结构
 */

import { ArticleCard } from '@/components/ArticleCard';
import type { ArticleListProps } from './types';
import styles from './styles.module.css';

export function ArticleList({
  articles,
  pagination,
  emptyMessage = '暂无文章',
  loading = false,
  className = '',
}: ArticleListProps) {
  // 加载状态
  if (loading) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.loading}>加载中...</div>
      </div>
    );
  }

  // 空状态
  if (articles.length === 0) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.empty}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.list}>
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            title={article.title}
            excerpt={article.excerpt}
            publishedAt={article.publishedAt}
            txHash={article.txHash}
            slug={article.slug}
            coverImage={article.coverImage}
            tags={article.tags}
            readingTime={article.readingTime}
          />
        ))}
      </div>

      {/* 分页 (简单实现) */}
      {pagination && pagination.totalPages > 1 && (
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            第 {pagination.currentPage} 页，共 {pagination.totalPages} 页
          </span>
          {/* 分页按钮可以在这里扩展 */}
        </div>
      )}
    </div>
  );
}

export type { ArticleListProps } from './types';
