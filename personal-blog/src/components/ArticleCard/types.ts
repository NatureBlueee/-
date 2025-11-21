/**
 * ArticleCard 组件类型定义
 *
 * 这是组件的"合同"，前端团队实现视觉层时必须遵循此接口
 */

export interface ArticleCardProps {
  /** 文章标题 */
  title: string;
  /** 文章摘要 */
  excerpt: string;
  /** 发布时间 (ISO 8601 格式) */
  publishedAt: string;
  /** 区块链交易 Hash - 如同传统书画的印章 */
  txHash: string;
  /** 文章 URL slug */
  slug: string;
  /** 封面图片 URL (可选) */
  coverImage?: string;
  /** 标签列表 */
  tags?: string[];
  /** 预计阅读时间 (分钟) */
  readingTime?: number;
  /** 点击事件回调 (可选，默认使用 Link 跳转) */
  onClick?: () => void;
  /** 自定义 className */
  className?: string;
}
