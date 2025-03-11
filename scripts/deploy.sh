#!/usr/bin/env sh
# git@github.com:zenHeart/web-interview.git
# 配置项
rep_url=$(git remote get-url web) # 仓库地址
RootPath=$(
    cd $(dirname $0)/..
    pwd
)

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹

cd ${RootPath}/build
pwd
git init
git add -A
git commit -m 'deploy'

git push -f ${rep_url} main:gh-pages
