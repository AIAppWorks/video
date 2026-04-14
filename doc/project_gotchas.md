---
name: 关键踩坑记录
description: 开发过程中发现的重要坑点，避免重复踩
type: feedback
originSessionId: cbc8885a-6b7b-4d85-af8d-86d3592fcb62
---
**1. postcss.config.js 必须存在**
Tailwind CSS 在 Next.js 中不生效的根本原因：缺少 `postcss.config.js`，`@tailwind` 指令不被处理。
Why: Next.js 通过 PostCSS 处理 CSS，没有 postcss.config.js 就不走 Tailwind 编译管道。
How to apply: 新建 Next.js + Tailwind 项目时必须创建该文件。

**2. Prisma 7 在此项目不可用**
Prisma 7 要求通过 adapter 连接（不支持 schema 里写 url），SQLite 的 better-sqlite3 adapter 在老 macOS 上 native 编译失败，libsql adapter 在 Next.js Turbopack 里有模块初始化时序问题。
Why: 老 macOS gyp 编译限制 + Turbopack 模块缓存时序问题。
How to apply: 此项目固定用 Prisma 5（@prisma/client@5），不升级到 Prisma 7。

**3. DATABASE_URL 必须用绝对路径**
SQLite 的 `file:./prisma/dev.db` 相对路径在 Next.js API route 里会报 URL_INVALID。
How to apply: `.env.local` 里写 `DATABASE_URL="file:///Users/xxx/.../prisma/dev.db"` 绝对路径。

**4. 环境变量用 .env.local 而非 .env**
Next.js Turbopack 下 `.env` 的变量在 API route 模块初始化时可能还未注入，`.env.local` 优先级更高且加载更早。

**5. Remotion 组件不能在 Server Component 里 import**
`remotion` 包用了 React.createContext，Server Component 里没有 React context，会报错。
How to apply: 模板组件通过 `useEffect` + 动态 import 在客户端加载；Server Component 只用 `src/templates/metadata.ts` 的纯数据。
