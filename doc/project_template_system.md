---
name: 模板系统设计
description: VideoTemplate 接口标准、注册中心、fieldMeta 编辑器元数据的设计理念
type: project
originSessionId: cbc8885a-6b7b-4d85-af8d-86d3592fcb62
---
模板系统是整个平台的核心，位于 `src/templates/`，是 Remotion Studio、@remotion/player 预览、服务端渲染三方共用的共享层。

**VideoTemplate 接口** (`src/templates/types.ts`):
- `schema` — Zod Schema，三合一：运行时验证 + TypeScript 类型推导 + 驱动编辑器 UI
- `fieldMeta` — 编辑器 UI 元数据（label、group、control 类型、min/max），与验证逻辑分离
- `component` — React 组件，在 @remotion/player（浏览器）和 @remotion/renderer（服务端）两个环境都能运行
- `composition` — 视频规格（宽高、fps、帧数）

**注册中心** (`src/templates/registry.ts`): Map 存储，`registerTemplate / getTemplate / getAllTemplates`

**新增模板只需**:
1. 在 `src/templates/<id>/` 创建组件 + index.ts（含 VideoTemplate 定义 + registerTemplate 调用）
2. 在 `src/templates/index.ts` 加一行 import

**Server Component 隔离**: `src/templates/metadata.ts` 存纯数据（无 Remotion 依赖），供 Next.js Server Component 使用；Remotion 组件通过 `useEffect` + 动态 import 在客户端加载，避免 RSC 中 React.createContext 报错。

**已有模板**:
- `growth-video-lite` — 1280×720，7秒，数据增长叙事（柱状图、计数动画）
- `metric-showcase` — 1080×1080，5秒，单 KPI 展示（方形，适合社交媒体）
- `before-after` — 1280×720，6秒，前后对比（分割线滑入揭示）
