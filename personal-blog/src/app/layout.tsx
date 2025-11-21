/**
 * 根布局组件
 *
 * 定义全局布局结构和元数据
 */

import type { Metadata } from 'next';
import { Layout } from '@/components/Layout';
import { siteConfig } from '@/config/site';
import './globals.css';

/**
 * 字体说明：
 * 使用系统字体栈作为基础，通过 CSS 变量配置
 * 实际部署时可通过 CDN 加载 Google Fonts
 *
 * 中文宋体: Noto Serif SC / Songti SC (系统)
 * 等宽字体: JetBrains Mono / Fira Code / Consolas
 */

/**
 * 站点元数据
 */
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Google Fonts CDN - 思源宋体 + JetBrains Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Noto+Serif+SC:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
