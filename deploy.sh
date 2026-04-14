#!/bin/bash

# 部署脚本 - 一键 git pull、build、后台启动
# 用法: bash deploy.sh

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 获取脚本所在的目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# 日志目录
LOG_DIR="$SCRIPT_DIR/logs"
mkdir -p "$LOG_DIR"

LOG_FILE="$LOG_DIR/deploy-$(date +%Y%m%d-%H%M%S).log"
CURRENT_LOG="$LOG_DIR/current.log"
PID_FILE="$LOG_DIR/app.pid"

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}开始部署应用${NC}"
echo -e "${YELLOW}========================================${NC}"

# 记录日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# 第一步：git pull
log "${GREEN}[1/4] 拉取最新代码...${NC}"
if git pull; then
    log "${GREEN}✓ 代码拉取成功${NC}"
else
    log "${RED}✗ 代码拉取失败${NC}"
    exit 1
fi

# 第二步：安装依赖
log "${GREEN}[2/4] 安装依赖...${NC}"
if npm install; then
    log "${GREEN}✓ 依赖安装成功${NC}"
else
    log "${RED}✗ 依赖安装失败${NC}"
    exit 1
fi

# 第二步（续）：生成 Prisma Client
log "${GREEN}[2.5/4] 生成 Prisma Client...${NC}"
if npm run prisma -- generate 2>&1 | tee -a "$LOG_FILE"; then
    log "${GREEN}✓ Prisma Client 生成成功${NC}"
else
    log "${RED}✗ Prisma Client 生成失败${NC}"
    exit 1
fi

# 第三步：构建
log "${GREEN}[3/4] 构建应用...${NC}"
if npm run build; then
    log "${GREEN}✓ 应用构建成功${NC}"
else
    log "${RED}✗ 应用构建失败${NC}"
    exit 1
fi

# 第四步：停止旧进程（如果存在）
log "${GREEN}[4/5] 启动应用...${NC}"
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if kill -0 "$OLD_PID" 2>/dev/null; then
        log "停止旧进程 (PID: $OLD_PID)"
        kill "$OLD_PID" 2>/dev/null || true
        sleep 2
    fi
fi

# 第五步：后台启动应用
log "启动新应用进程..."
nohup npm run start > "$CURRENT_LOG" 2>&1 &
NEW_PID=$!
echo "$NEW_PID" > "$PID_FILE"

sleep 2

# 检查进程是否成功启动
if kill -0 "$NEW_PID" 2>/dev/null; then
    log "${GREEN}✓ 应用启动成功 (PID: $NEW_PID)${NC}"
    log "${GREEN}========================================${NC}"
    log "${GREEN}部署完成！${NC}"
    log "${GREEN}========================================${NC}"
    log "应用日志: $CURRENT_LOG"
    log "部署日志: $LOG_FILE"
    log ""
    log "查看实时日志: tail -f $CURRENT_LOG"
    log "停止应用: kill $NEW_PID"
else
    log "${RED}✗ 应用启动失败${NC}"
    log "错误日志:"
    cat "$CURRENT_LOG" | tee -a "$LOG_FILE"
    exit 1
fi
