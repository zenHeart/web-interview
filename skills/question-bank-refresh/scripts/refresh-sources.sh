#!/usr/bin/env bash
# 刷新本地数据源镜像（repos/）。repos/ 已在 .gitignore，不入库。
#
# 用法：
#   bash skills/question-bank-refresh/scripts/refresh-sources.sh          # 刷新全部
#   bash skills/question-bank-refresh/scripts/refresh-sources.sh l2       # 只刷新真题仓
#   bash skills/question-bank-refresh/scripts/refresh-sources.sh l0       # 只刷新官方仓
#
# 说明：
#   - L2 真题仓用 --depth 1（需要读到文件内容）
#   - L0 官方仓用 --depth 1 --filter=blob:none（读文件时按需联网下载 blob）
#   - 已存在的目录做 fetch --depth 1 更新，不重复克隆
set -euo pipefail

# 网络保护：git 传输若 30 秒内低于 1KB/s 则主动中断，避免整轮刷新被单仓卡死。
# GIT_TERMINAL_PROMPT=0 禁止交互式凭据提示（无人值守场景必须）。
export GIT_TERMINAL_PROMPT=0
GIT_LOW_SPEED_OPTS=(-c http.lowSpeedLimit=1000 -c http.lowSpeedTime=30)
GIT_TIMEOUT_OPTS=(-c http.connectTimeout=20)
# 单仓整体墙钟上限（秒）；超时即放弃该仓并继续下一个
CLONE_TIMEOUT="${CLONE_TIMEOUT:-300}"

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
REPOS="$ROOT/repos"
MODE="${1:-all}"
mkdir -p "$REPOS"

# repo-slug<TAB>本地目录名
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

# 看门狗：杀掉 git 进程树（子进程 git-remote-https 才是真正在传数据的那一个，
# 只杀父进程会留下孤儿进程继续传输，等于没超时）
kill_tree() {
  local pid="$1"
  pkill -TERM -P "$pid" 2>/dev/null || true   # 先杀子进程
  kill -TERM "$pid" 2>/dev/null || true        # 再杀父进程
  sleep 1
  pkill -KILL -P "$pid" 2>/dev/null || true
  kill -KILL "$pid" 2>/dev/null || true
}

clone_or_update() {
  local slug="$1" name="$2" filter_flag="$3"
  local dir="$REPOS/$name"
  if [ -d "$dir/.git" ]; then
    printf '  ~ %-42s (更新)\n' "$slug"
    git -C "$dir" "${GIT_LOW_SPEED_OPTS[@]}" "${GIT_TIMEOUT_OPTS[@]}" fetch --depth 1 --quiet origin 2>/dev/null &
    local fpid=$!
    ( sleep "$CLONE_TIMEOUT"; kill_tree "$fpid" ) &
    local fwatch=$!
    wait "$fpid" 2>/dev/null || true
    kill -TERM "$fwatch" 2>/dev/null || true
    git -C "$dir" reset --hard --quiet "FETCH_HEAD" 2>/dev/null || true
  else
    printf '  + %-42s (克隆)\n' "$slug"
    local extra=()
    [ "$filter_flag" = "blobless" ] && extra=(--filter=blob:none)
    # 看门狗：单仓墙钟超过 CLONE_TIMEOUT 即终止该仓，继续下一个，不拖死整轮
    git clone --depth 1 "${extra[@]}" --quiet \
      "${GIT_LOW_SPEED_OPTS[@]}" "${GIT_TIMEOUT_OPTS[@]}" \
      "https://github.com/$slug.git" "$dir" 2>/dev/null &
    local pid=$!
    ( sleep "$CLONE_TIMEOUT"; kill_tree "$pid" ) &
    local watchdog=$!
    wait "$pid" 2>/dev/null || true
    kill -TERM "$watchdog" 2>/dev/null || true
    [ -d "$dir/.git" ] || printf '  ! 克隆失败或超时: %s\n' "$slug"
  fi
}

if [ "$MODE" = "all" ] || [ "$MODE" = "l2" ]; then
  echo "[L2] 真题题库仓"
  while IFS=$'\t' read -r slug name; do
    [ -z "$slug" ] && continue
    clone_or_update "$slug" "$name" full
  done <<< "$L2_LIST"
fi

if [ "$MODE" = "all" ] || [ "$MODE" = "l0" ]; then
  echo "[L0] 官方规范 / 源码仓"
  while IFS=$'\t' read -r slug name; do
    [ -z "$slug" ] && continue
    clone_or_update "$slug" "$name" blobless
  done <<< "$L0_LIST"
fi

echo
echo "镜像目录：$REPOS （共 $(find "$REPOS" -maxdepth 1 -mindepth 1 -type d | wc -l | tr -d ' ') 个）"
echo "各仓最后提交时间（判断是否停更）："
for d in "$REPOS"/*/; do
  [ -d "$d/.git" ] || continue
  printf '  %-34s %s\n' "$(basename "$d")" "$(git -C "$d" log -1 --format=%cI 2>/dev/null || echo '?')"
done
