/**
 * ArticleList 组件类型定义
 */

import type { ArticleListItem, Pagination } from '@/types';

export interface ArticleListProps {
  /** 文章列表数据 */
  articles: ArticleListItem[];
  /** 分页信息 (可选) */
  pagination?: Pagination;
  /** 空状态时显示的文案 */
  emptyMessage?: string;
  /** 加载状态 */
  loading?: boolean;
  /** 自定义 className */
  className?: string;
}
