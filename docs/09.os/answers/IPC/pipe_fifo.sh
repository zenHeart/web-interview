#!/usr/bin/env bash
# pipe_fifo.sh — 管道/命名管道示例（类 Unix）。
# 运行：bash pipe_fifo.sh
set -euo pipefail

# 1) 匿名管道：生产者 | 消费者
printf 'hello via pipe' | awk '{print toupper($0)}'

# 2) 命名管道（FIFO）
fifo="/tmp/demo_fifo_$$"
trap 'rm -f "$fifo"' EXIT
mkfifo "$fifo"
# 终端1：读者
cat "$fifo" &
# 终端2：写者
printf 'hello via fifo\n' > "$fifo"
wait
