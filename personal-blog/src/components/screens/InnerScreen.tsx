/**
 * 里世界（感性）- 第二屏
 *
 * 鸦青背景，月白文字，烟雾效果
 */

import type { Article } from '@/services/notion';
import { ArticleEntry } from './ArticleEntry';

interface InnerScreenProps {
  articles: Article[];
}

export function InnerScreen({ articles }: InnerScreenProps) {
  return (
    <section className="screen screen-inner" id="inner-smoke">
      {/* 虚空之烟 */}
      <div className="smoke-void hidden md:block" />

      {/* 烟雾分割线 */}
      <div className="divider-smoke-container hidden md:block">
        <div className="divider-smoke-line" />
      </div>

      {/* 左侧：虚空 */}
      <aside className="void-area hidden md:flex" style={{ justifyContent: 'flex-end', alignItems: 'flex-start' }}>
        <div className="font-mono" style={{ fontSize: '10px', color: '#C7B396', opacity: 0.5, marginLeft: '1rem' }}>
          // THE INCENSE REALM
        </div>
      </aside>

      {/* 右侧：梦境流 */}
      <main className="content-area">
        <div style={{ marginBottom: '8rem', paddingTop: '3rem', marginLeft: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', color: '#E6E8EB', marginBottom: '1rem', opacity: 0.9 }}>焚香</h1>
          <p className="font-mono" style={{ fontSize: '0.75rem', color: '#8FAAB0' }}>The Incense Trail</p>
        </div>

        {/* Drift Layout */}
        <div className="drift-layout" style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <ArticleEntry
                key={article.id}
                article={article}
                index={index + 1}
                variant="inner"
              />
            ))
          ) : (
            // 占位内容
            <>
              <ArticleEntry
                article={{
                  id: '1',
                  title: '关于红色的龙',
                  titleEn: 'The Red Dragon',
                  publishedAt: '2025-11-20',
                  category: '感性',
                  excerpt: '烟雾缭绕中，现实的边界开始模糊。龙的呼吸是热的，像服务器过载时的温度...'
                }}
                index={1}
                variant="inner"
              />
              <ArticleEntry
                article={{
                  id: '2',
                  title: '深渊凝视',
                  titleEn: '',
                  publishedAt: '2025-11-15',
                  category: '感性',
                  excerpt: '当你凝视代码时，代码也在凝视你。无序的字符在屏幕上跳动，如同古老的咒语。'
                }}
                index={2}
                variant="inner"
              />
            </>
          )}
        </div>
      </main>
    </section>
  );
}
