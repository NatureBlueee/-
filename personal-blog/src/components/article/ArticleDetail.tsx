/**
 * 文章详情组件
 *
 * 组合 ArticleHeader 和 ArticleContent
 * 负责整体布局和视觉呈现
 */

import type { Article } from '@/services/notion';
import { ArticleHeader } from './ArticleHeader';
import { ArticleContent } from './ArticleContent';
import styles from './styles.module.css';

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <article className={styles.article} data-category={article.category}>
      {/* 背景装饰 - 根据分类变化 */}
      <div className={styles.decoration} aria-hidden="true" />

      <div className={styles.container}>
        {/* 文章头部 */}
        <ArticleHeader article={article} />

        {/* 封面图片 (可选) */}
        {article.cover && (
          <figure className={styles.cover}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.cover}
              alt={article.title}
              className={styles.coverImage}
            />
          </figure>
        )}

        {/* 文章正文 */}
        {article.content && <ArticleContent content={article.content} />}

        {/* 文章底部 */}
        <footer className={styles.footer}>
          <div className={styles.divider} />
          <p className={styles.endMark}>完</p>
        </footer>
      </div>
    </article>
  );
}
