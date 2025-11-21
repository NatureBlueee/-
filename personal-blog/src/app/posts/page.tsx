/**
 * 文章列表页
 *
 * 展示所有文章，支持分页
 */

import type { Metadata } from 'next';
import { getArticles } from '@/services';
import { ArticleList } from '@/components/ArticleList';
import { siteConfig } from '@/config/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '文章',
  description: `${siteConfig.author.name} 的文章列表`,
};

interface PostsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  // 从 Crossbell 获取文章列表
  const { articles, pagination } = await getArticles({
    page: currentPage,
    pageSize: siteConfig.postsPerPage,
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>文章</h1>
        <p className={styles.subtitle}>
          所有文章均永久存储于 Crossbell 区块链
        </p>
      </header>

      <ArticleList
        articles={articles}
        pagination={pagination}
        emptyMessage="还没有文章，去 xLog 写点什么吧"
      />
    </div>
  );
}
