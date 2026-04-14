---
name: Remotion 老 macOS 渲染方案
description: 在老版本 macOS 上 Remotion 自带 ffmpeg 不兼容，必须用 hybrid bin + 绝对路径
type: feedback
originSessionId: cbc8885a-6b7b-4d85-af8d-86d3592fcb62
---
在老 macOS（< Ventura）上渲染 Remotion 视频必须用 hybrid bin 方案，否则 ffmpeg 报错。

**Why:** 系统 AVFoundation 与 Remotion 打包的 ffmpeg 不兼容，但系统已有的 ffmpeg（Homebrew 安装）可以正常工作。

**How to apply:**
1. 运行 `npm run prepare:bin`（即 `scripts/prepare-hybrid-bin.sh`）创建 `remotion-hybrid-bin/` 目录：复制 `@remotion/compositor-darwin-x64` 的 compositor 二进制 + dylib，再把系统 ffmpeg/ffprobe **用绝对路径**软链进去
2. 渲染时必须加 `--binaries-directory $PWD/remotion-hybrid-bin`（必须是绝对路径，相对路径会报 ENOENT）
3. 在 Node.js 服务端调用 CLI（`spawn('npx', ['remotion', 'render', ..., '--binaries-directory=<绝对路径>'])`），不能用 `@remotion/renderer` 的 Node API（不支持 binaries-directory）
4. `remotion-hybrid-bin/` 应加入 `.gitignore`
