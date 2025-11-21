/**
 * 首页
 *
 * 展示最新文章和站点介绍
 */

import { getRecentArticles } from '@/services';
import { ArticleList } from '@/components/ArticleList';
import { siteConfig } from '@/config/site';
import styles from './page.module.css';

export default async function HomePage() {
  // 从 Crossbell 获取最新文章
  const articles = await getRecentArticles(5);

  return (
    <div className={styles.container}>
      {/* 站点介绍 */}
      <section className={styles.hero}>
        <h1 className={styles.title}>{siteConfig.name}</h1>
        <p className={styles.description}>{siteConfig.description}</p>
      </section>

      {/* 最新文章 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>最新文章</h2>
        <ArticleList
          articles={articles}
          emptyMessage="还没有文章，去 xLog 写点什么吧"
        />
      </section>
    </div>
  );
}
