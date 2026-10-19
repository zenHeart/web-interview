#!/usr/bin/env bash
# 刷新本地数据源镜像（repos/）。repos/ 已在 .gitignore，不入库。
#
# 用法：
#   bash skills/question-bank-refresh/scripts/refresh-sources.sh          # 补齐缺失 + 更新现有
#   bash skills/question-bank-refresh/scripts/refresh-sources.sh l2       # 只处理真题仓
#   bash skills/question-bank-refresh/scripts/refresh-sources.sh l0       # 只处理官方仓
#   SKIP_UPDATE=1 bash skills/question-bank-refresh/scripts/refresh-sources.sh   # 只补齐，不更新
#
# 环境变量：
#   CLONE_TIMEOUT   单个 git 操作墙钟上限（秒），默认 120
#   CONCURRENCY     并发数，默认 4（分批并行，bash 3.2 无 wait -n）
#   SKIP_UPDATE=1   跳过对已存在仓库的 fetch 更新
#   REPOS_DIR       镜像存放目录，默认 $ROOT/repos。
#                   每日任务用**持久共享目录**（如 ~/.cache/web-interview-repos），
#                   再把工作区里的 repos 做成指向它的符号链接——
#                   否则按日期新建的工作区每晚会把 1.2GB 镜像重新克隆一遍。
#
# 设计要点（都是踩过的坑）：
#   - 克隆优先于更新：新仓带来新考点，旧仓更新只是保鲜，先保证覆盖面
#   - 分批并行：串行 22 个大仓 fetch 会占满整轮墙钟
#   - 三层网络保护：GIT_TERMINAL_PROMPT=0 / http lowSpeed 限制 / 杀进程树看门狗
set -euo pipefail

export GIT_TERMINAL_PROMPT=0
GIT_LOW_SPEED_OPTS=(-c http.lowSpeedLimit=1000 -c http.lowSpeedTime=30)
GIT_TIMEOUT_OPTS=(-c http.connectTimeout=20)
CLONE_TIMEOUT="${CLONE_TIMEOUT:-120}"
CONCURRENCY="${CONCURRENCY:-4}"

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
REPOS="${REPOS_DIR:-$ROOT/repos}"
MODE="${1:-all}"
mkdir -p "$REPOS"

L2_LIST=$(cat <<'EOF'
pro-collection/interview-question	interview-question
yangshun/front-end-interview-handbook	front-end-interview-handbook
h5bp/Front-end-Developer-Interview-Questions	Front-end-Developer-Interview-Questions
ElemeFE/node-interview	node-interview
CavsZhouyou/Front-End-Interview-Notebook	Front-End-Interview-Notebook
MaxAbramchuck/awesome-interview-questions	awesome-interview-questions
Awesome-Interview/Awesome-Interview	Awesome-Interview
hzfe/awesome-interview	awesome-interview
haizlin/fe-interview	fe-interview
evestorm/front-end-interview	front-end-interview
abc-club/free-resources	free-resources
scottaohara/accessibility_interview_questions	accessibility_interview_questions
DopplerHQ/awesome-interview-questions	awesome-interview-questions-doppler
EOF
)

L0_LIST=$(cat <<'EOF'
tc39/proposals	proposals
tc39/proposal-signals	proposal-signals
vuejs/rfcs	rfcs
vuejs/core-vapor	core-vapor
reactjs/rfcs	rfcs-react
module-federation/universe	universe
modelcontextprotocol/specification	specification
rolldown/rolldown	rolldown
web-infra-dev/rspack	rspack
biomejs/biome	biome
vitejs/vite	vite
preactjs/signals	signals
solidjs/solid	solid
sveltejs/svelte	svelte
WebAssembly/spec	wasm-spec
WebAssembly/gc	wasm-gc
gpuweb/gpuweb	gpuweb
vercel/ai	vercel-ai
vercel/next.js	nextjs
openai/openai-agents-python	openai-agents-python
huggingface/transformers.js	transformers-js
whatwg/html	whatwg-html
EOF
)

# 杀掉 git 进程树（子进程 git-remote-https 才是真正在传数据的那一个，
# 只杀父进程会留下孤儿进程继续传输，等于没超时）
kill_tree() {
  local pid="$1"
  pkill -TERM -P "$pid" 2>/dev/null || true
  kill -TERM "$pid" 2>/dev/null || true
  sleep 1
  pkill -KILL -P "$pid" 2>/dev/null || true
  kill -KILL "$pid" 2>/dev/null || true
}

# 克隆单个仓库（目录已存在则跳过）
do_clone() {
  local slug="$1" name="$2" filter_flag="$3"
  local dir="$REPOS/$name"
  if [ -d "$dir/.git" ]; then
    return 0
  fi
  printf '  + %-42s (克隆)\n' "$slug"
  local extra=()
  [ "$filter_flag" = "blobless" ] && extra=(--filter=blob:none)
  git clone --depth 1 "${extra[@]}" --quiet \
    "${GIT_LOW_SPEED_OPTS[@]}" "${GIT_TIMEOUT_OPTS[@]}" \
    "https://github.com/$slug.git" "$dir" 2>/dev/null &
  local pid=$!
  ( sleep "$CLONE_TIMEOUT"; kill_tree "$pid" ) &
  local watchdog=$!
  wait "$pid" 2>/dev/null || true
  kill -TERM "$watchdog" 2>/dev/null || true
  [ -d "$dir/.git" ] || printf '  ! 克隆失败或超时: %s\n' "$slug"
}

# 更新单个已存在仓库
do_update() {
  local slug="$1" name="$2"
  local dir="$REPOS/$name"
  [ -d "$dir/.git" ] || return 0
  printf '  ~ %-42s (更新)\n' "$slug"
  git -C "$dir" "${GIT_LOW_SPEED_OPTS[@]}" "${GIT_TIMEOUT_OPTS[@]}" fetch --depth 1 --quiet origin 2>/dev/null &
  local pid=$!
  ( sleep "$CLONE_TIMEOUT"; kill_tree "$pid" ) &
  local watchdog=$!
  wait "$pid" 2>/dev/null || true
  kill -TERM "$watchdog" 2>/dev/null || true
  git -C "$dir" reset --hard --quiet "FETCH_HEAD" 2>/dev/null || true
}

# 分批并行执行：每批 CONCURRENCY 个同时跑，跑完一批再下一批
run_batches() {
  local op="$1" filter_flag="$2"
  local list="$3"
  local -a batch=()
  local count=0
  while IFS=$'\t' read -r slug name; do
    [ -z "$slug" ] && continue
    batch+=("$slug"$'\t'"$name")
    count=$((count + 1))
    if [ $((count % CONCURRENCY)) -eq 0 ]; then
      for item in "${batch[@]}"; do
        $op "${item%%$'\t'*}" "${item##*$'\t'}" "$filter_flag" &
      done
      wait
      batch=()
    fi
  done <<< "$list"
  if [ ${#batch[@]} -gt 0 ]; then
    for item in "${batch[@]}"; do
      $op "${item%%$'\t'*}" "${item##*$'\t'}" "$filter_flag" &
    done
    wait
  fi
}

if [ "$MODE" = "all" ] || [ "$MODE" = "l2" ]; then
  echo "[L2] 真题题库仓"
  run_batches do_clone full "$L2_LIST"
fi

if [ "$MODE" = "all" ] || [ "$MODE" = "l0" ]; then
  echo "[L0] 官方规范 / 源码仓"
  run_batches do_clone blobless "$L0_LIST"
fi

# 缺失补齐后再更新（可用 SKIP_UPDATE=1 跳过）
if [ "${SKIP_UPDATE:-0}" != "1" ]; then
  if [ "$MODE" = "all" ] || [ "$MODE" = "l2" ]; then
    echo "[L2] 更新已有仓"
    run_batches do_update full "$L2_LIST"
  fi
  if [ "$MODE" = "all" ] || [ "$MODE" = "l0" ]; then
    echo "[L0] 更新已有仓"
    run_batches do_update blobless "$L0_LIST"
  fi
fi

echo
# 用 ls 而非 find：REPOS 可能是指向持久目录的符号链接，find 默认不跟随符号链接会数成 0
echo "镜像目录：$REPOS （共 $(ls -1 "$REPOS" 2>/dev/null | wc -l | tr -d ' ') 个）"
echo "各仓最后提交时间（判断是否停更）："
for d in "$REPOS"/*/; do
  [ -d "$d/.git" ] || continue
  printf '  %-34s %s\n' "$(basename "$d")" "$(git -C "$d" log -1 --format=%cI 2>/dev/null || echo '?')"
done
