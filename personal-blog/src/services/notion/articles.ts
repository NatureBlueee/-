/**
 * Notion 文章服务
 *
 * 从 Notion Database 获取文章数据
 */

import { Client } from '@notionhq/client';

/**
 * Notion 客户端
 *
 * 类型断言用于解决 TypeScript 严格模式下的类型推断问题
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
}) as any;

const DATABASE_ID = process.env.NOTION_DATABASE_ID || '';

/**
 * 文章类型（简化版）
 */
export interface Article {
  id: string;
  title: string;
  titleEn?: string;
  publishedAt: string;
  category: '理性' | '感性';
  excerpt: string;
  content?: string;
  cover?: string;
}

/**
 * 从 RichText 数组提取纯文本
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractText(richText: any[] | undefined): string {
  if (!richText) return '';
  return richText.map((t) => t.plain_text || '').join('');
}

/**
 * 将 Notion Page 转换为 Article
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformPageToArticle(page: any): Article {
  const props = page.properties || {};

  // 提取封面图片
  let cover: string | undefined;
  if (page.cover) {
    if (page.cover.type === 'external') {
      cover = page.cover.external?.url;
    } else if (page.cover.type === 'file') {
      cover = page.cover.file?.url;
    }
  }

  const publishedDate = props['发布日期']?.date?.start
    || page.created_time?.split('T')[0]
    || '';

  return {
    id: page.id,
    title: extractText(props['标题']?.title),
    titleEn: extractText(props['Title_EN']?.rich_text),
    publishedAt: publishedDate,
    category: (props['类型']?.select?.name as '理性' | '感性') || '理性',
    excerpt: '',
    cover,
  };
}

/**
 * 获取已发布的文章列表
 */
export async function getArticles(): Promise<Article[]> {
  if (!DATABASE_ID) {
    console.warn('NOTION_DATABASE_ID not configured');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: '状态',
        select: {
          equals: '已发布',
        },
      },
      sorts: [
        {
          property: '发布日期',
          direction: 'descending',
        },
      ],
    });

    return response.results
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((page: any) => 'properties' in page)
      .map(transformPageToArticle);
  } catch (error) {
    console.warn('Failed to fetch articles from Notion:', error);
    return [];
  }
}

/**
 * 按类型获取文章
 */
export async function getArticlesByCategory(
  category: '理性' | '感性'
): Promise<Article[]> {
  if (!DATABASE_ID) {
    console.warn('[Notion] DATABASE_ID 未配置');
    return [];
  }

  try {
    // 先尝试获取数据库信息，验证连接和属性
    const dbInfo = await notion.databases.retrieve({ database_id: DATABASE_ID });
    const props = Object.keys(dbInfo.properties);

    // 检查必要属性是否存在
    const requiredProps = ['状态', '类型', '发布日期', '标题'];
    const missingProps = requiredProps.filter(p => !props.includes(p));

    if (missingProps.length > 0) {
      console.warn(`[Notion] 数据库缺少属性: ${missingProps.join(', ')}`);
      console.warn(`[Notion] 当前数据库属性: ${props.join(', ')}`);
      // 继续执行，不使用过滤器
    }

    // 构建过滤器（仅当属性存在时）
    const hasStatus = props.includes('状态');
    const hasCategory = props.includes('类型');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let filter: any = undefined;

    if (hasStatus && hasCategory) {
      filter = {
        and: [
          { property: '状态', select: { equals: '已发布' } },
          { property: '类型', select: { equals: category } },
        ],
      };
    } else if (hasCategory) {
      filter = { property: '类型', select: { equals: category } };
    }

    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter,
      sorts: props.includes('发布日期')
        ? [{ property: '发布日期', direction: 'descending' }]
        : undefined,
    });

    const articles = response.results
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((page: any) => 'properties' in page)
      .map(transformPageToArticle)
      // 如果没有类型属性，在代码层面过滤
      .filter((a: Article) => !hasCategory || a.category === category);

    console.log(`[Notion] 获取到 ${articles.length} 篇 ${category} 文章`);
    return articles;
  } catch (error) {
    // 更详细的错误信息
    const err = error as Error & { code?: string; status?: number };
    console.error(`[Notion] 获取 ${category} 文章失败:`);
    console.error(`  - 错误: ${err.message}`);
    if (err.code) console.error(`  - 代码: ${err.code}`);
    if (err.status) console.error(`  - 状态: ${err.status}`);

    if (err.code === 'object_not_found') {
      console.error('  - 提示: 请确认 Integration 已连接到数据库');
    }
    return [];
  }
}

/**
 * 获取单篇文章详情（含内容）
 */
export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id });

    if (!('properties' in page)) {
      return null;
    }

    const article = transformPageToArticle(page);

    // 获取页面内容
    const blocks = await notion.blocks.children.list({ block_id: id });
    article.content = blocksToMarkdown(blocks.results);
    article.excerpt = article.content.slice(0, 200).replace(/[#*`>\[\]]/g, '') + '...';

    return article;
  } catch (error) {
    console.warn('Failed to fetch article:', error);
    return null;
  }
}

/**
 * 获取所有文章 ID（用于静态生成）
 */
export async function getAllArticleIds(): Promise<string[]> {
  const articles = await getArticles();
  return articles.map((a) => a.id);
}

/**
 * 将 Notion Blocks 转换为 Markdown（简化版）
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function blocksToMarkdown(blocks: any[]): string {
  return blocks
    .map((block) => {
      if (!block.type) return '';

      switch (block.type) {
        case 'paragraph':
          return extractText(block.paragraph?.rich_text) + '\n\n';
        case 'heading_1':
          return '# ' + extractText(block.heading_1?.rich_text) + '\n\n';
        case 'heading_2':
          return '## ' + extractText(block.heading_2?.rich_text) + '\n\n';
        case 'heading_3':
          return '### ' + extractText(block.heading_3?.rich_text) + '\n\n';
        case 'bulleted_list_item':
          return '- ' + extractText(block.bulleted_list_item?.rich_text) + '\n';
        case 'numbered_list_item':
          return '1. ' + extractText(block.numbered_list_item?.rich_text) + '\n';
        case 'quote':
          return '> ' + extractText(block.quote?.rich_text) + '\n\n';
        case 'code':
          return '```\n' + extractText(block.code?.rich_text) + '\n```\n\n';
        case 'divider':
          return '---\n\n';
        default:
          return '';
      }
    })
    .join('');
}
