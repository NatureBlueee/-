/**
 * 关于页面
 */

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '关于',
  description: `关于 ${siteConfig.author.name}`,
};

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>关于</h1>
      </header>

      <section className={styles.content}>
        {/*
          占位符内容
          实际内容可以从 Crossbell 的 Character metadata 获取
          或者从独立的 Markdown 文件读取
        */}
        <p className={styles.paragraph}>
          我是 {siteConfig.author.name}，一个区块链行业的前端开发者。
        </p>
        <p className={styles.paragraph}>
          这个网站是我的数字石碑，用来记录那些光怪陆离的想法和持久的美学追求。
        </p>
        <p className={styles.paragraph}>
          所有内容都永久存储在 Crossbell 区块链上，即使这个前端推倒重建，文字也不会丢失。
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>技术栈</h2>
          <ul className={styles.list}>
            <li>内容平台：xLog (基于 Crossbell 区块链)</li>
            <li>前端框架：Next.js 14</li>
            <li>部署平台：Vercel</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>联系</h2>
          <p className={styles.paragraph}>
            你可以在{' '}
            <a
              href={`https://xlog.app/${siteConfig.author.handle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              xLog
            </a>{' '}
            找到我。
          </p>
        </div>
      </section>
    </div>
  );
}
