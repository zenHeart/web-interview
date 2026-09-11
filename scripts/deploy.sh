#!/usr/bin/env bash
set -euo pipefail

# ================================
# Deploy script for gh-pages
# 功能新增：
# 1. 校验当前分支为 main 且工作区干净且已推送远端
# 2. 捕获 main 最新提交 hash 与完整提交说明作为部署提交说明
# 3. 部署提交信息中携带源码 commit hash，便于追溯
# ================================

RootPath=$(cd "$(dirname "$0")/.." && pwd)
cd "$RootPath"

# 部署远端固定为 web；源代码远端固定为 origin（从 origin/main 读取提交信息）
if ! git remote get-url web >/dev/null 2>&1; then
    echo "[deploy] 未找到名为 'web' 的远端，请先配置：git remote add web <git-url>" >&2
    exit 1
fi
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "[deploy] 未找到 'origin' 远端，无法读取 origin/main 提交信息" >&2
    exit 1
fi
DEPLOY_REMOTE=web
SOURCE_REMOTE=origin
rep_url=$(git remote get-url web)

current_branch=$(git symbolic-ref --short HEAD)
if [[ "$current_branch" != "main" ]]; then
    echo "[deploy] 当前分支为 '$current_branch'，请在 main 分支执行部署。" >&2
    exit 1
fi

# 工作区 / 暂存区需要干净
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "[deploy] 工作区或暂存区存在未提交修改，请先提交。" >&2
    exit 1
fi

# 获取 origin/main 最新（源）提交；与部署远端无关
echo "[deploy] fetch origin/main..."
git fetch --quiet "$SOURCE_REMOTE" main
if ! git rev-parse "$SOURCE_REMOTE/main" >/dev/null 2>&1; then
    echo "[deploy] 获取 origin/main 失败" >&2
    exit 1
fi
origin_hash=$(git rev-parse "$SOURCE_REMOTE/main")
local_hash=$(git rev-parse HEAD)
if [[ "$local_hash" != "$origin_hash" ]]; then
    echo "[deploy] 警告：本地 main ($local_hash) 与 origin/main ($origin_hash) 不一致，将以 origin/main 作为构建来源。" >&2
fi

# 获取 origin/main 最新提交信息
SOURCE_COMMIT_HASH=$origin_hash
SOURCE_COMMIT_SHORT=$(git rev-parse --short "$SOURCE_REMOTE/main")
SOURCE_COMMIT_SUBJECT=$(git log -1 --pretty=%s "$SOURCE_REMOTE/main")
SOURCE_COMMIT_BODY=$(git log -1 --pretty=%b "$SOURCE_REMOTE/main")
BUILD_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "[deploy] 构建源提交(origin/main): $SOURCE_COMMIT_HASH - $SOURCE_COMMIT_SUBJECT"

# 构建（使用已有 lock 保证可重复，并指定 gh-pages 远端 baseUrl）
export BASE_URL="${BASE_URL:-/web-interview/}"
npm run build

cd "$RootPath/build"
echo "[deploy] 进入构建目录 $(pwd)"

# 初始化临时 git 仓库并提交
git init --initial-branch=deploy >/dev/null 2>&1 || git init >/dev/null 2>&1
git add -A

# 写入追溯元信息文件（可供前端或调试使用，可选）
cat > deployment-meta.json <<EOF
{
    "sourceCommit": "$SOURCE_COMMIT_HASH",
    "sourceCommitShort": "$SOURCE_COMMIT_SHORT",
    "subject": "${SOURCE_COMMIT_SUBJECT//"/\"}",
    "buildTimeUTC": "$BUILD_TIME"
}
EOF
git add deployment-meta.json

COMMIT_MSG_HEADER="deploy: $SOURCE_COMMIT_SHORT $SOURCE_COMMIT_SUBJECT"
if [[ -n "$SOURCE_COMMIT_BODY" ]]; then
    git commit -m "$COMMIT_MSG_HEADER" -m "$SOURCE_COMMIT_BODY" >/dev/null
else
    git commit -m "$COMMIT_MSG_HEADER" >/dev/null
fi

# 强制推送到 gh-pages 分支
git push -f "$rep_url" HEAD:gh-pages
echo "[deploy] 已部署到 gh-pages (source $SOURCE_COMMIT_HASH)"
