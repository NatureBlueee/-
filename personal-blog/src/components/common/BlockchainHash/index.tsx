/**
 * BlockchainHash 组件 - 占位符实现
 *
 * 职责：展示区块链交易 Hash，类似传统书画的印章
 * 状态：占位符，基础结构
 */

import type { BlockchainHashProps } from './types';
import styles from './styles.module.css';

/** Crossbell 区块链浏览器 URL */
const EXPLORER_URL = 'https://scan.crossbell.io/tx';

export function BlockchainHash({
  hash,
  mode = 'short',
  clickable = true,
  showLabel = true,
  className = '',
}: BlockchainHashProps) {
  const displayHash =
    mode === 'short' ? `${hash.slice(0, 6)}...${hash.slice(-4)}` : hash;

  const content = (
    <span className={`${styles.container} ${className}`}>
      {showLabel && <span className={styles.label}>链上存证</span>}
      <code className={styles.hash}>{displayHash}</code>
    </span>
  );

  if (clickable) {
    return (
      <a
        href={`${EXPLORER_URL}/${hash}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        title="在区块链浏览器中查看"
      >
        {content}
      </a>
    );
  }

  return content;
}

export type { BlockchainHashProps } from './types';
