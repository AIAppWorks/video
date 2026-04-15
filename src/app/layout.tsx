import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Video.AiAppWorks.cn — 短视频生成平台',
  description: '选择模板，自定义文案和特效，一键导出短视频',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <Script
          strategy="afterInteractive"
          src="https://hm.baidu.com/hm.js?4d19516da4bc0ab6db5b5817368f6c9a"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
