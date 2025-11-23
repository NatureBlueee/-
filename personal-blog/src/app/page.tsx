/**
 * 首页 - 双屏布局
 *
 * 第一屏：表世界（理性）
 * 第二屏：里世界（感性）
 */

import { getArticlesByCategory } from '@/services/notion';
import { SurfaceScreen } from '@/components/screens/SurfaceScreen';
import { InnerScreen } from '@/components/screens/InnerScreen';
import { CustomCursor } from '@/components/common/CustomCursor';
import { GrainTexture } from '@/components/common/GrainTexture';
import { SmokeFilters } from '@/components/common/SmokeFilters';

export default async function HomePage() {
  // 从 Notion 获取文章（按类型分类）
  const [rationalArticles, emotionalArticles] = await Promise.all([
    getArticlesByCategory('理性'),
    getArticlesByCategory('感性'),
  ]);

  return (
    <>
      {/* SVG Filters for Smoke Effects */}
      <SmokeFilters />

      {/* 全局效果 */}
      <GrainTexture />
      <CustomCursor />

      {/* 双屏滚动容器 */}
      <div className="snap-container">
        {/* 第一屏：表世界 (理性) */}
        <SurfaceScreen articles={rationalArticles} />

        {/* 第二屏：里世界 (感性) */}
        <InnerScreen articles={emotionalArticles} />
      </div>
    </>
  );
}
