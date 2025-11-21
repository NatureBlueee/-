/**
 * 文章服务层
 *
 * 将 Crossbell API 响应转换为应用层的业务类型
 * 这是数据流的关键转换层：Crossbell API → 业务类型
 */

import type { Article, ArticleListItem, Pagination } from '@/types';
import type { CrossbellNote } from './types';
import {
  getCharacterByHandle,
  getNotesByCharacter,
  getNoteBySlug,
  getNoteDetail,
  generateSlug,
} from './client';
import { siteConfig } from '@/config/site';
import { calculateReadingTime, countWords } from '@/utils/text';

/**
 * 将 Crossbell Note 转换为 ArticleListItem
 */
function transformNoteToArticleListItem(note: CrossbellNote): ArticleListItem {
  const content = note.metadata?.content;
  const title = content?.title || '无标题';
  const rawContent = content?.content || '';

  // 提取摘要：优先使用 summary，否则截取正文
  const excerpt =
    content?.summary ||
    rawContent.replace(/[#*`>\[\]]/g, '').slice(0, 200) + '...';

  // 提取封面图片
  const coverImage = content?.attachments?.find((a) =>
    a.mime_type?.startsWith('image/')
  )?.address;

  return {
    slug: generateSlug(title),
    title,
    excerpt,
    publishedAt: note.publishedAt || note.createdAt,
    updatedAt: note.updatedAt,
    txHash: note.transactionHash,
    coverImage,
    tags: content?.tags || [],
    readingTime: calculateReadingTime(rawContent),
  };
}

/**
 * 将 Crossbell Note 转换为完整 Article
 */
function transformNoteToArticle(note: CrossbellNote): Article {
  const listItem = transformNoteToArticleListItem(note);
  const rawContent = note.metadata?.content?.content || '';

  return {
    ...listItem,
    content: rawContent,
    wordCount: countWords(rawContent),
  };
}

/**
 * 空分页响应
 */
function emptyPaginationResponse(page: number, pageSize: number) {
  return {
    articles: [] as ArticleListItem[],
    pagination: {
      currentPage: page,
      pageSize,
      totalCount: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    },
  };
}

/**
 * 获取文章列表
 */
export async function getArticles(options: {
  page?: number;
  pageSize?: number;
} = {}): Promise<{ articles: ArticleListItem[]; pagination: Pagination }> {
  const { page = 1, pageSize = siteConfig.postsPerPage } = options;

  try {
    // 获取 Character ID
    const character = await getCharacterByHandle(siteConfig.author.handle);

    if (!character) {
      return emptyPaginationResponse(page, pageSize);
    }

    // 获取文章列表
    // 注意：Crossbell API 使用 cursor 分页，这里简化处理
    // 如果需要精确分页，需要维护 cursor 映射
    const response = await getNotesByCharacter(character.characterId, {
      limit: pageSize,
    });

    const articles = response.list
      .filter((note) => !note.deleted)
      .map(transformNoteToArticleListItem);

    const totalCount = response.count;
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      articles,
      pagination: {
        currentPage: page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    // API 不可用时返回空数据
    console.warn('getArticles: API unavailable', error);
    return emptyPaginationResponse(page, pageSize);
  }
}

/**
 * 根据 slug 获取文章详情
 */
export async function getArticleBySlug(
  slug: string
): Promise<Article | null> {
  try {
    const character = await getCharacterByHandle(siteConfig.author.handle);

    if (!character) {
      return null;
    }

    const note = await getNoteBySlug(character.characterId, slug);

    if (!note || note.deleted) {
      return null;
    }

    return transformNoteToArticle(note);
  } catch (error) {
    console.warn('getArticleBySlug: API unavailable', error);
    return null;
  }
}

/**
 * 获取所有文章的 slug 列表（用于静态生成）
 */
export async function getAllArticleSlugs(): Promise<string[]> {
  try {
    const character = await getCharacterByHandle(siteConfig.author.handle);

    if (!character) {
      return [];
    }

    const slugs: string[] = [];
    let cursor: string | undefined;
    const maxPages = 20;
    let currentPage = 0;

    while (currentPage < maxPages) {
      const response = await getNotesByCharacter(character.characterId, {
        limit: 50,
        cursor,
      });

      for (const note of response.list) {
        if (!note.deleted) {
          const slug = generateSlug(note.metadata?.content?.title || '');
          if (slug) {
            slugs.push(slug);
          }
        }
      }

      if (!response.cursor || response.list.length === 0) {
        break;
      }

      cursor = response.cursor;
      currentPage++;
    }

    return slugs;
  } catch (error) {
    console.warn('getAllArticleSlugs: API unavailable', error);
    return [];
  }
}

/**
 * 获取最新的 N 篇文章（用于首页展示）
 */
export async function getRecentArticles(
  count: number = 5
): Promise<ArticleListItem[]> {
  const { articles } = await getArticles({ pageSize: count });
  return articles;
}
