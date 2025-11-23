/**
 * 文章头部组件
 *
 * 展示文章标题、英文标题、日期、分类
 * 设计：宋代美学 - 简约、留白、层次分明
 */

import type { Article } from '@/services/notion';
import styles from './styles.module.css';

interface ArticleHeaderProps {
  article: Pick<Article, 'title' | 'titleEn' | 'publishedAt' | 'category'>;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className={styles.header}>
      {/* 分类标签 - 如印章般点缀 */}
      <span className={styles.category} data-category={article.category}>
        {article.category}
      </span>

      {/* 主标题 */}
      <h1 className={styles.title}>{article.title}</h1>

      {/* 英文标题 (可选) */}
      {article.titleEn && (
        <p className={styles.titleEn}>{article.titleEn}</p>
      )}

      {/* 发布日期 */}
      <time className={styles.date} dateTime={article.publishedAt}>
        {article.publishedAt}
      </time>
    </header>
  );
}
