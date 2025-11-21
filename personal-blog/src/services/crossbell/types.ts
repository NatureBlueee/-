/**
 * Crossbell API 响应类型定义
 *
 * 这些类型直接对应 Crossbell Indexer API 的响应结构
 * 与业务类型 (types/article.ts) 分离，通过转换函数连接
 *
 * API 文档: https://indexer.crossbell.io/docs
 */

/**
 * Crossbell Character (用户/博客)
 */
export interface CrossbellCharacter {
  characterId: number;
  handle: string;
  primary: boolean;
  uri: string;
  metadata?: {
    content?: {
      name?: string;
      bio?: string;
      avatars?: string[];
    };
  };
  owner: string;
  createdAt: string;
  updatedAt: string;
  transactionHash: string;
  blockNumber: number;
}

/**
 * Crossbell Note (文章/帖子)
 */
export interface CrossbellNote {
  characterId: number;
  noteId: number;
  uri: string;
  metadata?: {
    content?: {
      title?: string;
      content?: string;
      summary?: string;
      tags?: string[];
      sources?: string[];
      date_published?: string;
      /** 封面图片 */
      attachments?: Array<{
        name?: string;
        address?: string;
        mime_type?: string;
      }>;
    };
  };
  owner: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  transactionHash: string;
  blockNumber: number;
  /** 是否已删除 */
  deleted: boolean;
}

/**
 * Crossbell 分页响应
 */
export interface CrossbellListResponse<T> {
  list: T[];
  count: number;
  cursor?: string;
}

/**
 * 获取 Notes 的请求参数
 */
export interface GetNotesParams {
  /** Character ID */
  characterId: number;
  /** 每页数量 */
  limit?: number;
  /** 分页游标 */
  cursor?: string;
  /** 是否包含已删除 */
  includeDeleted?: boolean;
}

/**
 * 获取单个 Note 的请求参数
 */
export interface GetNoteParams {
  characterId: number;
  noteId: number;
}
