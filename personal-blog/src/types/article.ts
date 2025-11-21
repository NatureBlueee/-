/**
 * 文章实体类型定义
 *
 * 这是应用层的业务类型，与 API 响应类型分离
 * 当 API 变更时，只需修改 services/crossbell/types.ts 的转换逻辑
 */

/**
 * 文章元数据
 */
export interface ArticleMeta {
  /** 文章唯一标识符 (slug) */
  slug: string;
  /** 文章标题 */
  title: string;
  /** 文章摘要 */
  excerpt: string;
  /** 发布时间 (ISO 8601 格式) */
  publishedAt: string;
  /** 最后更新时间 (ISO 8601 格式) */
  updatedAt: string;
  /** 区块链交易 Hash - 如同传统书画的印章 */
  txHash: string;
  /** 封面图片 URL (可选) */
  coverImage?: string;
  /** 标签列表 */
  tags: string[];
  /** 阅读时间 (分钟) */
  readingTime: number;
}

/**
 * 完整文章内容
 */
export interface Article extends ArticleMeta {
  /** 文章正文 (Markdown 格式) */
  content: string;
  /** 字数统计 */
  wordCount: number;
}

/**
 * 文章列表项 - 用于列表展示，不包含正文
 */
export type ArticleListItem = ArticleMeta;

/**
 * 文章状态
 */
export type ArticleStatus = 'published' | 'draft' | 'archived';
