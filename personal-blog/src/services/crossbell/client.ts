/**
 * Crossbell API 客户端
 *
 * 封装所有与 Crossbell Indexer API 的交互
 * 当 API 变更时，只需修改这个文件
 *
 * API 基础文档: https://indexer.crossbell.io/docs
 */

import type {
  CrossbellCharacter,
  CrossbellNote,
  CrossbellListResponse,
} from './types';

/**
 * 临时方案：硬编码 API endpoint
 *
 * 为什么临时：等 xLog SDK 稳定后可考虑切换到官方 SDK
 * 风险：如果 API 域名变更，需要手动更新
 * 追踪：可创建 Issue 追踪 - 评估 xLog 官方 SDK
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_CROSSBELL_API_URL ||
  'https://indexer.crossbell.io/v1';

/**
 * API 请求错误
 */
export class CrossbellApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public endpoint: string
  ) {
    super(message);
    this.name = 'CrossbellApiError';
  }
}

/**
 * 通用请求函数
 */
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      // Next.js 缓存策略：ISR，60秒后重新验证
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new CrossbellApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        endpoint
      );
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof CrossbellApiError) {
      throw error;
    }
    throw new CrossbellApiError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      0,
      endpoint
    );
  }
}

/**
 * 根据 handle 获取 Character 信息
 */
export async function getCharacterByHandle(
  handle: string
): Promise<CrossbellCharacter | null> {
  try {
    const character = await request<CrossbellCharacter>(
      `/characters/${handle}`
    );
    return character;
  } catch (error) {
    if (error instanceof CrossbellApiError && error.statusCode === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * 获取 Character 的文章列表
 */
export async function getNotesByCharacter(
  characterId: number,
  options: { limit?: number; cursor?: string } = {}
): Promise<CrossbellListResponse<CrossbellNote>> {
  const { limit = 20, cursor } = options;

  const params = new URLSearchParams({
    limit: String(limit),
    // 只获取来自 xLog 的文章
    sources: 'xlog',
  });

  if (cursor) {
    params.set('cursor', cursor);
  }

  return request<CrossbellListResponse<CrossbellNote>>(
    `/characters/${characterId}/notes?${params.toString()}`
  );
}

/**
 * 获取单篇文章详情
 */
export async function getNoteDetail(
  characterId: number,
  noteId: number
): Promise<CrossbellNote | null> {
  try {
    const note = await request<CrossbellNote>(
      `/characters/${characterId}/notes/${noteId}`
    );
    return note;
  } catch (error) {
    if (error instanceof CrossbellApiError && error.statusCode === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * 根据 slug 查找文章
 *
 * xLog 使用 metadata.content.title 的 slug 化版本作为 URL
 * 这个函数遍历文章列表找到匹配的文章
 *
 * 注意：这是一个 O(n) 操作，如果文章很多可能需要优化
 * 可考虑：1. 服务端缓存 2. 使用 xLog 的 slug 查询 API（如果有的话）
 */
export async function getNoteBySlug(
  characterId: number,
  slug: string
): Promise<CrossbellNote | null> {
  // 获取所有文章（分页获取）
  let cursor: string | undefined;
  const maxPages = 10; // 防止无限循环
  let currentPage = 0;

  while (currentPage < maxPages) {
    const response = await getNotesByCharacter(characterId, {
      limit: 50,
      cursor,
    });

    for (const note of response.list) {
      const noteSlug = generateSlug(note.metadata?.content?.title || '');
      if (noteSlug === slug) {
        return note;
      }
    }

    if (!response.cursor || response.list.length === 0) {
      break;
    }

    cursor = response.cursor;
    currentPage++;
  }

  return null;
}

/**
 * 生成 URL-friendly slug
 *
 * 将标题转换为 URL slug，处理中英文混合
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // 替换空格和特殊字符为连字符
    .replace(/[\s\W]+/g, '-')
    // 移除首尾连字符
    .replace(/^-+|-+$/g, '')
    // 如果全是非 ASCII 字符（如纯中文），使用 encodeURIComponent
    || encodeURIComponent(title.toLowerCase().trim());
}
