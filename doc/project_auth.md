---
name: 用户认证系统
description: 邮箱+密码登录的实现方案、数据库配置
type: project
originSessionId: cbc8885a-6b7b-4d85-af8d-86d3592fcb62
---
**认证方案**: Auth.js (NextAuth v5 beta) + Credentials Provider + bcryptjs + JWT session

关键文件:
- `src/lib/auth.ts` — NextAuth 配置，Credentials provider，`authorize` 里查库验密码
- `src/app/api/auth/[...nextauth]/route.ts` — handlers 挂载
- `src/app/api/register/route.ts` — 注册 API（bcrypt.hash + prisma.user.create）
- `src/app/login/LoginForm.tsx` — `signIn('credentials', { email, password, redirect: false })`
- `src/app/register/RegisterForm.tsx` — POST /api/register → 成功后自动 signIn

**流程**: 注册（邮箱+密码，bcrypt 加密存储）→ 自动登录 → JWT session → 浏览器可记住密码

**数据库**: Prisma 5 + SQLite（`prisma/dev.db`），DATABASE_URL 用绝对路径 `file:///...`
- 重要：必须用 `.env.local`（非 `.env`），Next.js Turbopack 才能正确注入环境变量
- 重要：DATABASE_URL 必须是绝对路径，Prisma SQLite 不支持相对路径

**未登录保护**: `my-videos` 页面 `await auth()` 检查，未登录 `redirect('/login')`；编辑器"导出"按钮未登录时变为"登录后导出视频"跳转链接

**Session 扩展**: `jwt callback` 把 `user.id` 写入 token，`session callback` 再写入 `session.user.id`，API route 通过 `session.user.id` 关联渲染记录
