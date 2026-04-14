# Memory Index

## 项目基础
- [项目概览](project_overview.md) — 定位、技术栈、启动命令、项目根目录
- [关键踩坑记录](project_gotchas.md) — postcss缺失/Prisma7不可用/DB绝对路径/RSC隔离等5个关键坑

## 核心架构
- [模板系统设计](project_template_system.md) — VideoTemplate接口、注册中心、fieldMeta、Server隔离、3个现有模板
- [编辑器与实时预览](project_editor_preview.md) — @remotion/player、Props自动生成、客户端动态加载
- [视频渲染导出流程](project_render_pipeline.md) — CLI spawn方案、进度轮询、渲染参数
- [用户认证系统](project_auth.md) — 邮箱+密码、Auth.js、Prisma5 SQLite、环境变量注意事项

## 环境问题
- [Remotion 老 macOS 渲染方案](feedback_render_macos.md) — hybrid bin + 绝对路径，用 CLI spawn 而非 Node API
