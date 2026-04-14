---
name: 视频渲染导出流程
description: 服务端渲染 API、进度轮询、hybrid bin 的完整实现
type: project
originSessionId: cbc8885a-6b7b-4d85-af8d-86d3592fcb62
---
渲染采用 **CLI spawn 方案**（非 @remotion/renderer Node API），原因：老 macOS 需要 --binaries-directory 绝对路径，Node API 不支持该参数。

**渲染流程**:
1. `POST /api/render` — 验证 props、创建 RenderJob（写入 SQLite）、`setImmediate` 后台启动渲染、返回 `{ jobId }`
2. `src/server/render-queue.ts` — `spawn('npx', ['remotion', 'render', ..., '--binaries-directory=<绝对路径>'])` 执行渲染；stdout 解析 "Rendered X/N" 和 "Encoded X/N" 更新进度（0-90% 渲染，90-100% 编码）
3. `GET /api/render?jobId=xxx` — 前端每 1.5s 轮询，返回 `{ status, progress, downloadUrl }`
4. 渲染完成 → 写入 `public/renders/<jobId>.mp4` → 前端显示下载按钮

**老 macOS hybrid bin** (详见 feedback_render_macos.md):
- `npm run prepare:bin` 执行 `scripts/prepare-hybrid-bin.sh`
- 必须用绝对路径: `--binaries-directory=/Users/.../remotion-hybrid-bin`

**渲染参数**: `--codec=h264 --crf=23 --image-format=jpeg --jpeg-quality=80 --muted`

**数据库**: `prisma.renderJob` 存储所有渲染记录（userId 关联用户），`/my-videos` 页面展示历史
