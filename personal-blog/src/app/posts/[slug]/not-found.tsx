/**
 * 文章未找到页面
 */

import Link from 'next/link';
import styles from './not-found.module.css';

export default function ArticleNotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>文章未找到</p>
      <p className={styles.hint}>这篇文章可能已被删除或链接有误</p>
      <Link href="/posts" className={styles.link}>
        返回文章列表
      </Link>
    </div>
  );
}
