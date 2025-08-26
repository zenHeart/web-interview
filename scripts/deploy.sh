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

# 仅允许使用名为 web 的远端 (pages 强制 web)
if ! git remote get-url web >/dev/null 2>&1; then
    echo "[deploy] 未找到名为 'web' 的远端，请先配置：git remote add web <git-url>" >&2
    exit 1
fi
DEPLOY_REMOTE=web
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

# 确保 main 已与远端同步
if git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
        git fetch "$DEPLOY_REMOTE" main --quiet
    local_hash=$(git rev-parse HEAD)
    remote_hash=$(git rev-parse @{u})
    if [[ "$local_hash" != "$remote_hash" ]]; then
        echo "[deploy] 本地 main 未推送到远端（local=$local_hash remote=$remote_hash）。请先 git push。" >&2
        exit 1
    fi
else
        echo "[deploy] main 分支未设置上游(remote tracking)。请先执行：git push -u web main" >&2
    exit 1
fi

# 获取最新提交信息
SOURCE_COMMIT_HASH=$(git rev-parse HEAD)
SOURCE_COMMIT_SHORT=$(git rev-parse --short HEAD)
SOURCE_COMMIT_SUBJECT=$(git log -1 --pretty=%s)
SOURCE_COMMIT_BODY=$(git log -1 --pretty=%b)
BUILD_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "[deploy] 构建源提交: $SOURCE_COMMIT_HASH - $SOURCE_COMMIT_SUBJECT"

# 构建（使用已有 lock 保证可重复）
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
