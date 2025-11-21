/**
 * 文章详情页
 *
 * 展示单篇文章的完整内容
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticleSlugs } from '@/services';
import { BlockchainHash } from '@/components/common/BlockchainHash';
import { formatDate } from '@/utils/formatDate';
import { siteConfig } from '@/config/site';
import styles from './page.module.css';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * 生成静态路径
 * 支持 ISR，新文章会自动生成
 *
 * 注意：如果构建时 API 不可用，返回空数组
 * 页面将在首次访问时通过 ISR 生成
 */
export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    // 构建环境可能无法访问 API，返回空数组
    // 页面将在运行时通过 ISR 动态生成
    console.warn('generateStaticParams: API unavailable, using ISR fallback');
    return [];
  }
}

/**
 * 生成页面元数据
 */
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [siteConfig.author.name],
      images: article.coverImage ? [article.coverImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className={styles.article}>
      {/* 文章头部 */}
      <header className={styles.header}>
        <h1 className={styles.title}>{article.title}</h1>

        <div className={styles.meta}>
          <time className={styles.date} dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
          <span className={styles.dot}>·</span>
          <span className={styles.readingTime}>
            {article.readingTime} 分钟阅读
          </span>
          <span className={styles.dot}>·</span>
          <span className={styles.wordCount}>{article.wordCount} 字</span>
        </div>

        {/* 标签 */}
        {article.tags.length > 0 && (
          <div className={styles.tags}>
            {article.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* 封面图片 */}
      {article.coverImage && (
        <div className={styles.cover}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.coverImage}
            alt={article.title}
            className={styles.coverImage}
          />
        </div>
      )}

      {/* 文章正文 */}
      <div className={styles.content}>
        {/*
          注意：这里直接渲染 Markdown 文本
          Phase 2 可以集成 MDX 或 Markdown 渲染库
          当前为占位符实现
        */}
        <pre className={styles.markdown}>{article.content}</pre>
      </div>

      {/* 文章底部 - 区块链印章 */}
      <footer className={styles.footer}>
        <div className={styles.divider} />
        <div className={styles.blockchain}>
          <BlockchainHash hash={article.txHash} showLabel={true} />
        </div>
      </footer>
    </article>
  );
}
