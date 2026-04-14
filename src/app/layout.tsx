import type { Metadata } from 'next';
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
      <body>{children}</body>
    </html>
  );
}
