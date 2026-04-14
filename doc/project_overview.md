---
name: 项目概览
description: VideoSaaS 短视频生成平台的定位、目标和整体架构
type: project
originSessionId: cbc8885a-6b7b-4d85-af8d-86d3592fcb62
---
基于 Remotion 的短视频 SaaS 平台：用户从模板库选模板 → 编辑器实时预览改文案/颜色/动画 → 导出 MP4。

**技术栈**: Next.js 16 (App Router) + Remotion 4 + TypeScript + Tailwind CSS + Prisma 5 + SQLite + Auth.js (NextAuth v5)

**项目根目录**: `/Users/www1/code/project/docs/video-saas`

**启动命令**:
- `npm run dev` — Next.js web 应用（http://localhost:3000）
- `npm run studio` — Remotion Studio 开发调试
- `npm run render` — CLI 渲染单个视频（需先 `npm run prepare:bin`）
- `npm run prepare:bin` — 准备老 macOS 渲染环境（hybrid bin）

**Why:** 本地 MVP 优先，单包结构避免 monorepo 复杂性，SQLite 避免本地安装 PostgreSQL。生产环境可直接切换 DATABASE_URL 到 PostgreSQL。
