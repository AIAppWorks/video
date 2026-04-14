#!/bin/bash

# 日志管理脚本 - 查看和管理应用日志

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
LOG_DIR="$SCRIPT_DIR/logs"
PID_FILE="$LOG_DIR/app.pid"
CURRENT_LOG="$LOG_DIR/current.log"

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 创建日志目录
mkdir -p "$LOG_DIR"

case "$1" in
    status)
        echo -e "${YELLOW}=== 应用状态 ===${NC}"
        if [ -f "$PID_FILE" ]; then
            PID=$(cat "$PID_FILE")
            if kill -0 "$PID" 2>/dev/null; then
                echo -e "${GREEN}✓ 应用运行中 (PID: $PID)${NC}"
                ps -p "$PID" -o pid,vsz,rss,comm,etime
            else
                echo -e "${RED}✗ 应用未运行 (PID 文件过期: $PID)${NC}"
            fi
        else
            echo -e "${RED}✗ 应用未运行${NC}"
        fi
        ;;

    logs)
        echo -e "${YELLOW}实时日志 (Ctrl+C 退出):${NC}"
        tail -f "$CURRENT_LOG"
        ;;

    logs-recent)
        echo -e "${YELLOW}最近 50 行日志:${NC}"
        tail -50 "$CURRENT_LOG"
        ;;

    logs-list)
        echo -e "${YELLOW}所有日志文件:${NC}"
        ls -lh "$LOG_DIR"/*.log 2>/dev/null | awk '{print $9, "(" $5 ")"}'
        ;;

    stop)
        echo -e "${YELLOW}停止应用...${NC}"
        if [ -f "$PID_FILE" ]; then
            PID=$(cat "$PID_FILE")
            if kill -0 "$PID" 2>/dev/null; then
                kill "$PID"
                echo -e "${GREEN}✓ 应用已停止${NC}"
                rm "$PID_FILE"
            else
                echo -e "${RED}✗ 进程不存在${NC}"
            fi
        else
            echo -e "${RED}✗ 未找到应用进程${NC}"
        fi
        ;;

    restart)
        echo -e "${YELLOW}重启应用...${NC}"
        bash "$SCRIPT_DIR/deploy.sh"
        ;;

    clean)
        echo -e "${YELLOW}清理旧日志 (保留最近 10 个)...${NC}"
        ls -t "$LOG_DIR"/deploy-*.log 2>/dev/null | tail -n +11 | xargs rm -f
        echo -e "${GREEN}✓ 清理完成${NC}"
        ;;

    *)
        echo -e "${YELLOW}日志管理脚本${NC}"
        echo ""
        echo "用法: bash logs.sh [命令]"
        echo ""
        echo "命令:"
        echo "  status        - 查看应用状态"
        echo "  logs          - 实时查看应用日志"
        echo "  logs-recent   - 查看最近 50 行日志"
        echo "  logs-list     - 列出所有日志文件"
        echo "  stop          - 停止应用"
        echo "  restart       - 重启应用（运行 deploy.sh）"
        echo "  clean         - 清理旧日志（保留最近 10 个）"
        echo ""
        echo "示例:"
        echo "  bash logs.sh status      # 查看应用是否在运行"
        echo "  bash logs.sh logs        # 实时查看日志"
        echo "  bash logs.sh stop        # 停止应用"
        ;;
esac
