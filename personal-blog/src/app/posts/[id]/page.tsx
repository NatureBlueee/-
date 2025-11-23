/**
 * 文章详情页
 *
 * 展示单篇文章的完整内容
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleById, getAllArticleIds } from '@/services';
import { siteConfig } from '@/config/site';
import styles from './page.module.css';

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

/**
 * 生成静态路径
 */
export async function generateStaticParams() {
  try {
    const ids = await getAllArticleIds();
    return ids.map((id) => ({ id }));
  } catch (error) {
    console.warn('generateStaticParams: API unavailable', error);
    return [];
  }
}

/**
 * 生成页面元数据
 */
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    return { title: '文章未找到' };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [siteConfig.author.name],
      images: article.cover ? [article.cover] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <article className={styles.article}>
      {/* 文章头部 */}
      <header className={styles.header}>
        <span className={styles.category}>{article.category}</span>
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
        <div className={styles.cover}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.cover}
            alt={article.title}
            className={styles.coverImage}
          />
        </div>
      )}

      {/* 文章正文 */}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: article.content?.replace(/\n/g, '<br />') || '',
        }}
      />
    </article>
  );
}
