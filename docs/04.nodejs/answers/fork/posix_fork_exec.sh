#!/usr/bin/env bash
# posix_fork_exec.sh
#
# 目的：用可观测的方式说明 POSIX fork + exec 的典型流程。
# 说明：
# - fork() 复制当前进程（写时复制），父子进程从 fork 返回，返回值不同
# - 子进程通常紧跟着 exec*() 族调用加载新程序（替换自身镜像）
# - 这里用 bash 来模拟展示流程和形态特征（非内部实现），方便在任意 Unix 环境演示
#
# 用法：
#   bash posix_fork_exec.sh

set -euo pipefail

parent_pid=$$
echo "[parent $$] start"

# fork: 在 bash 中用 subshell/后台作业演示分歧（语义并非内核 fork 实现，仅用于解释流程）
(
  echo "[child $$] after fork: I'm child (return value == 0)"
  echo "[child $$] now exec into /bin/echo (replace image)"
  exec /bin/echo "[child $$] hello from new program via exec"
) &

child_pid=$!
echo "[parent $$] after fork: created child pid ${child_pid} (return value == ${child_pid})"

wait ${child_pid}
echo "[parent $$] child ${child_pid} exited"
