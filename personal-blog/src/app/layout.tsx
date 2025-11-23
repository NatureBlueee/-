/**
 * 根布局组件
 *
 * 极简布局，首页使用全屏双屏设计
 */

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import './globals.css';

/**
 * 站点元数据
 */
export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | 晨曦`,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Google Fonts - 思源宋体 + JetBrains Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400&family=Noto+Serif+SC:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
