# 部署脚本使用指南

## 文件说明

- **deploy.sh** - 一键部署脚本
- **logs.sh** - 日志管理脚本
- **logs/** - 日志目录（自动创建）

## 快速开始

### 1. 首次使用 - 一键部署

```bash
bash deploy.sh
```

脚本会自动执行：
1. ✓ git pull - 拉取最新代码
2. ✓ npm install - 安装依赖
3. ✓ npm run build - 构建应用
4. ✓ 后台启动应用 - 不阻塞终端
5. ✓ 保存日志文件

### 2. 日志管理

#### 查看应用状态
```bash
bash logs.sh status
```

#### 实时查看日志
```bash
bash logs.sh logs
```
按 Ctrl+C 退出

#### 查看最近日志
```bash
bash logs.sh logs-recent
```

#### 列出所有日志
```bash
bash logs.sh logs-list
```

#### 停止应用
```bash
bash logs.sh stop
```

#### 重启应用
```bash
bash logs.sh restart
```

#### 清理旧日志（保留最近10个）
```bash
bash logs.sh clean
```

## 日志文件位置

- **当前日志**: `logs/current.log` - 实时应用输出
- **部署日志**: `logs/deploy-YYYYMMDD-HHMMSS.log` - 每次部署的详细日志
- **进程信息**: `logs/app.pid` - 应用进程ID

## 常见场景

### 场景 1: 首次部署
```bash
bash deploy.sh
# 等待部署完成，应用会后台运行
bash logs.sh status  # 确认应用已启动
```

### 场景 2: 拉取新代码并重新部署
```bash
bash deploy.sh
# 或者
bash logs.sh restart
```

### 场景 3: 监控应用运行
```bash
bash logs.sh logs
# 实时查看日志输出
```

### 场景 4: 应用出错调试
```bash
bash logs.sh logs-recent  # 查看最近日志
# 或查看部署日志
cat logs/deploy-20260414-*.log
```

### 场景 5: 定期清理日志
```bash
bash logs.sh clean
```

## 自动化部署（可选）

如果需要定时部署，可使用 crontab：

```bash
# 编辑 crontab
crontab -e

# 添加以下行（每天凌晨 2 点部署）
# 替换 /path/to/project 为你的实际项目路径
0 2 * * * cd /path/to/your/project && bash deploy.sh >> logs/cron.log 2>&1
```

## 手动启动开发环境

如果需要启动开发环境（`npm run dev`），可使用：

```bash
npm run dev
```

开发环境会占用终端。如需后台运行：

```bash
nohup npm run dev > logs/dev.log 2>&1 &
```

## 故障排查

### 部署失败
1. 查看部署日志：`cat logs/deploy-*.log`
2. 检查网络连接：`git pull`
3. 检查依赖：`npm install`
4. 检查构建：`npm run build`

### 应用无法启动
1. 查看应用日志：`bash logs.sh logs-recent`
2. 检查端口占用：`lsof -i :3000`（默认 Next.js 端口）
3. 查看环境变量：检查 `.env` 或 `.env.local` 文件

### 占用端口
```bash
# 查找占用端口的进程
lsof -i :3000

# 杀死进程
kill -9 <PID>

# 或者修改端口：在 deploy.sh 中添加
# PORT=3001 nohup npm run start > ...
```

## 与旧进程的处理

deploy.sh 会自动：
1. 检查是否有旧进程在运行
2. 如果有，自动停止旧进程
3. 启动新进程
4. 保存新进程的 PID

这样即使多次运行 deploy.sh，也不会出现多个应用实例。

## 提示

- 部署脚本会自动创建 `logs/` 目录
- 每次部署都会生成一个新的日志文件
- 使用 `tail -f logs/current.log` 可以实时监控应用
- 可以将这些脚本添加到 git，方便团队使用
