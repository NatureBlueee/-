/**
 * Footer 组件 - 占位符实现
 *
 * 职责：网站底部信息
 * 状态：占位符，基础结构
 */

import { siteConfig } from '@/config/site';
import type { FooterProps } from '../types';
import styles from './styles.module.css';

export function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} ${className}`}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          &copy; {currentYear} {siteConfig.author.name}
        </p>
        <p className={styles.powered}>
          内容永久存储于{' '}
          <a
            href="https://crossbell.io"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Crossbell
          </a>
          {' '}区块链
        </p>
      </div>
    </footer>
  );
}
