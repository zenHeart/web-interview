#!/usr/bin/env sh

# 配置项
rep_url=$(git remote get-url origin) # 仓库地址
bookRootPath=$(
    cd $(dirname $0)/..
    pwd
)/question/_book

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹

cd ${bookRootPath}

git init
git add -A
git commit -m 'deploy'

git push -f ${rep_url} master:gh-pages
