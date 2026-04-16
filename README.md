# Video SaaS — 数据驱动的增长叙事视频生成器

## 技术栈

- **框架**：Next.js 15（App Router，前后端一体）
- **数据库**：SQLite + Prisma ORM
- **认证**：NextAuth v5（JWT 策略）
- **视频渲染**：Remotion

---

## 项目结构

```
src/
├── app/
│   ├── page.tsx                        # 首页
│   ├── login/                          # 登录页
│   ├── register/                       # 注册页
│   ├── my-videos/                      # 视频列表页
│   ├── editor/[templateId]/            # 编辑器页
│   └── api/                            # 后端 API（Route Handlers）
│       ├── auth/[...nextauth]/route.ts  # 登录 / 登出
│       ├── register/route.ts            # 注册
│       └── render/route.ts             # 发起 & 查询视频渲染
├── lib/
│   ├── prisma.ts                       # Prisma 客户端单例
│   └── auth.ts                         # NextAuth 配置
├── server/
│   └── render-queue.ts                 # 渲染队列（仅服务端）
└── templates/                          # 视频模板
prisma/
├── schema.prisma                       # 数据库 Schema
└── migrations/                         # 迁移文件
```

**约定**：`app/api/**/route.ts` 是后端接口；`app/**/page.tsx` 是前端页面；`lib/` 和 `server/` 下的代码只运行在服务端。

---

## 数据库

### Schema

```
User
  id           String   (cuid, 主键)
  email        String   (唯一)
  passwordHash String
  name         String?
  createdAt    DateTime

RenderJob
  id          String   (cuid, 主键)
  userId      String   (外键 → User)
  templateId  String
  props       String   (JSON 字符串)
  status      String   (queued / rendering / done / error)
  progress    Int
  outputPath  String?
  error       String?
  createdAt   DateTime
  completedAt DateTime?
```

### 连接配置

数据库连接通过环境变量 `DATABASE_URL` 指定，格式为 SQLite 文件路径：

```
DATABASE_URL="file:///绝对路径/prisma/dev.db"
```

连接链路：

```
.env (DATABASE_URL)
  → prisma/schema.prisma
  → npx prisma generate（生成客户端）
  → src/lib/prisma.ts（PrismaClient 单例）
  → 各 API route 中 import { prisma } from '@/lib/prisma'
```

---

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

**本地开发环境**：复制示例文件并修改

```bash
# 复制本地开发配置
cp .env.local.example .env.local

# 编辑 .env.local 填入实际值（可选，使用默认值也可以运行）
# .env.local 已在 .gitignore 中，不会被提交
```

**生产环境部署**：
```bash
# 复制示例文件
cp .env.example .env

# 编辑 .env 填入生产环境值
# ⚠️ 重要: .env 文件包含敏感信息，必须加入 .gitignore，不能提交到 Git
```

环境变量说明：

| 变量 | 说明 | 示例 |
|-----|------|------|
| `DATABASE_URL` | SQLite 数据库路径 | `file:./prisma/dev.db` |
| `AUTH_SECRET` | NextAuth 认证密钥（必须用 `openssl rand -base64 32` 生成） | 见 `.env.example` |
| `NEXTAUTH_URL` | 应用访问 URL | 本地: `http://localhost:3000`<br>生产: `https://your-domain.com` |

### 3. 初始化数据库

首次使用，执行迁移并生成 Prisma 客户端：

```bash
# 执行迁移（创建表结构）
npx prisma migrate dev

# 生成 Prisma 客户端（schema 变更后也需重新执行）
npx prisma generate
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 其他开发命令

```bash
# 打开 Prisma Studio（可视化查看数据库）
npx prisma studio

# 启动 Remotion Studio（预览视频模板）
npm run studio
```

---

## 生产部署

### 1. 生成安全密钥

```bash
openssl rand -base64 32
```

### 2. 配置生产环境变量

```env
DATABASE_URL="file:///生产服务器上的绝对路径/prisma/prod.db"
AUTH_SECRET="上一步生成的随机字符串"
```

### 3. 执行数据库迁移

```bash
npx prisma migrate deploy
```

### 4. 构建并启动

```bash
npm run build
npm run start
```

### 注意事项

- SQLite 是单文件数据库，适合单机/低并发场景。高并发生产环境建议替换为 PostgreSQL，修改 `prisma/schema.prisma` 中的 `provider = "postgresql"` 并更新 `DATABASE_URL` 即可。
- 渲染输出文件默认写入 `out/` 目录，部署时确保该目录有写入权限。
- `AUTH_SECRET` 在生产环境必须使用随机值，否则 JWT 存在安全风险。



## 模板渲染（model-names）

单场景导出，传入场景编号（1-7），输出到 `out/` 目录：

```bash
npm run render:scene -- 1   # Scene1 - 开场
npm run render:scene -- 2   # Scene2 - Opus
npm run render:scene -- 3   # Scene3 - Sonnet
npm run render:scene -- 4   # Scene4 - Haiku
npm run render:scene -- 5   # Scene5 - Mythos 详解
npm run render:scene -- 6   # Scene6 - 总结
npm run render:scene -- 7   # Scene7 - Mythos 预告
```
渲染其他图
```
npx remotion still src/index.ts metric-showcase out/metric-showcase/img/1.jpg \
  --frame=179 \
  --jpeg-quality=90
```