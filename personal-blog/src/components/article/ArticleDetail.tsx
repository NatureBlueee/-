/**
 * 文章详情组件
 *
 * 沉浸式阅读体验
 * 继承首页的世界观（表世界/里世界）
 */

import type { Article } from '@/services/notion';
import { GrainTexture } from '@/components/common/GrainTexture';
import { CustomCursor } from '@/components/common/CustomCursor';
import { MysticalWatermark } from './MysticalWatermark';
import { NatureSeal } from './NatureSeal';
import { ArticleContent } from './ArticleContent';
import styles from './styles.module.css';

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  // 根据文章类型决定主题
  const theme = article.category === '感性' ? 'inner' : 'surface';

  return (
    <div className="article-page" data-theme={theme}>
      {/* 全局效果 */}
      <GrainTexture />
      <CustomCursor />

      {/* 神秘水印 */}
      <MysticalWatermark theme={theme} />

      <article className={styles.article}>
        {/* 文章头部 */}
        <header className={styles.header}>
          <h1 className={styles.title}>{article.title}</h1>
          {article.titleEn && (
            <p className={styles.titleEn}>{article.titleEn}</p>
          )}
          <time className={styles.date} dateTime={article.publishedAt}>
            {article.publishedAt}
          </time>
        </header>

        {/* 封面图片 */}
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
        {article.content && (
          <div className={styles.content}>
            <ArticleContent content={article.content} />
          </div>
        )}

        {/* 文章结尾 */}
        <footer className={styles.footer}>
          <div className={styles.endMark}>完</div>
          <NatureSeal />
        </footer>
      </article>
    </div>
  );
}
