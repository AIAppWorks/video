---
name: 编辑器与实时预览
description: @remotion/player 实时预览、Props 编辑器自动生成的实现方式
type: project
originSessionId: cbc8885a-6b7b-4d85-af8d-86d3592fcb62
---
编辑器核心文件: `src/editor/EditorClient.tsx`（'use client'），拆分为左侧 Props 面板 + 右侧 Player 预览。

**实时预览**: 使用 `@remotion/player` 的 `<Player>` 组件，`inputProps={currentProps}` 绑定 React state，props 变化立即刷新预览，无需重新编译。Player 不需要 Remotion root 或 bundle，直接接收组件 + props。

**Props 编辑器自动生成** (`src/editor/PropsEditorPanel.tsx`):
- 读取 `template.fieldMeta` 按 group 分组（content/style/animation）
- 按 `fieldMeta.control` 类型渲染不同控件：TextControl / NumberControl / ColorControl / SliderControl
- 修改 → `schema.safeParse()` 验证 → 更新 state → Player 自动刷新
- 控件位于 `src/editor/controls/`

**动态加载 Remotion 组件** (避免 SSR 报错):
```ts
useEffect(() => {
  import('@/templates').then(() => import('@/templates/registry'))
    .then(({ getTemplate }) => setTemplate(getTemplate(templateId)))
}, [templateId])
```

**Why:** Remotion 用了 React.createContext，在 Next.js Server Component 里会报错。模板组件必须在客户端加载。
