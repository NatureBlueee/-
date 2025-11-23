/**
 * 表世界（理性）- 第一屏
 *
 * 宣纸白背景，墨汁黑文字
 */

import type { Article } from '@/services/notion';
import { ArticleEntry } from './ArticleEntry';

interface SurfaceScreenProps {
  articles: Article[];
}

export function SurfaceScreen({ articles }: SurfaceScreenProps) {
  return (
    <section className="screen screen-surface" id="surface">
      {/* 分割线 */}
      <div className="divider-line hidden md:block" />
      {/* 朱砂红点睛 */}
      <div className="divider-accent hidden md:block" />

      {/* 左侧：留白区 */}
      <aside className="void-area hidden md:flex">
        <div className="logo-vertical">晨曦</div>
        <div className="signature-block">
          <div className="signature-name">晨曦</div>
          <div className="signature-en">Nature / Architect</div>
        </div>
      </aside>

      {/* 右侧：内容流 */}
      <main className="content-area">
        {/* 移动端 Logo */}
        <div className="md:hidden" style={{ marginBottom: '4rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '0.2em' }}>晨曦</div>
        </div>

        {/* 导航 */}
        <nav className="font-mono" style={{
          marginBottom: '6rem',
          fontSize: '10px',
          letterSpacing: '0.2em',
          display: 'flex',
          gap: '2rem',
          color: '#999'
        }}>
          <a href="#" className="hover-target" style={{ color: 'inherit', textDecoration: 'none' }}>INDEX</a>
          <a href="#inner-smoke" className="hover-target" style={{ color: 'inherit', textDecoration: 'none' }}>DEEP DIVE</a>
        </nav>

        {/* 文章列表 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <ArticleEntry
                key={article.id}
                article={article}
                index={index + 1}
                variant="surface"
              />
            ))
          ) : (
            // 占位内容
            <>
              <ArticleEntry
                article={{
                  id: '1',
                  title: '留白的',
                  titleEn: 'Violence',
                  publishedAt: '2025-11-21',
                  category: '理性',
                  excerpt: '在 70% 的空白面前，剩下的 30% 必须足够锋利。'
                }}
                index={1}
                variant="surface"
              />
              <ArticleEntry
                article={{
                  id: '2',
                  title: '物质性',
                  titleEn: 'Materiality',
                  publishedAt: '2025-10-14',
                  category: '理性',
                  excerpt: 'Web3 的交互不应是冰冷的金属，而应是温润的玉石。'
                }}
                index={2}
                variant="surface"
              />
            </>
          )}
        </div>
      </main>
    </section>
  );
}
