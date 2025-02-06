# git

## 常用的 git 命令

## 什么是 semver 规范，~1.2.3 与 ^1.2.3 的版本号范围是多少 {#p2-semver-version-range}

SemVer（Semantic Versioning，语义化版本）是一种规范，用于管理软件版本号的命名和变更。它的目的是通过明确的版本号规则，让开发者和用户能够更好地理解软件的变化和兼容性。

SemVer 版本号由三个部分组成：主版本号（major）、次版本号（minor）和修订版本号（patch），格式为`major.minor.patch`。

* 主版本号：当进行不兼容的 API 更改时增加。
* 次版本号：当添加向后兼容的新功能时增加。
* 修订版本号：当进行向后兼容的错误修复时增加。

**`~1.2.3`的版本号范围**：

* 这表示匹配大于等于 1.2.3 且小于 1.3.0 的版本。
* 它会优先更新修订版本号，即如果有 1.2.4、1.2.5 等版本，会优先选择这些版本进行安装，但不会安装 1.3.0 及以上版本。

**`^1.2.3`的版本号范围**：

* 表示匹配大于等于 1.2.3 且小于 2.0.0 的版本。
* 它会优先更新次版本号和修订版本号。例如，如果有 1.3.0、1.4.2 等版本，会优先选择这些版本进行安装，但不会安装 2.0.0 及以上版本。

## 在开发过程中，想做 git 代码暂存，该如何做 {#p2-git-stash}

在 Git 中，如果你想要暂存当前的工作进度，可以使用`git stash`命令。这个命令会将你的工作目录中的修改（已追踪文件的修改和暂存的改动）保存到一个未完成工作的栈中，同时将你的工作目录恢复到上次提交的状态，从而让你可以转而处理其他工作，之后再回来继续刚才的工作。

 基本用法

* **暂存当前的工作**

```bash
git stash
```

或者，为这次暂存操作添加一个描述，以便之后更容易识别：

```bash
git stash save "特征X的进度"
```

* **查看暂存列表**

```bash
git stash list
```

这个命令会显示所有被暂存的进度列表。

* **应用最近的暂存**

```bash
git stash apply
```

默认情况下，`git stash apply`将重新应用最近暂存的进度。如果你有多个暂存进度，可以通过指定 stash 的名称（例如：`stash@{0}`）来选择具体的一个进度使用。

```bash
git stash apply stash@{0}
```

* **弹出最近的暂存**

```bash
git stash pop
```

这个命令将应用最近的暂存进度，并将这个暂存记录从暂存的栈中移除。

* **删除一个指定的暂存**

```bash
git stash drop stash@{0}
```

* **清除所有暂存**

```bash
git stash clear
```

 进阶用法

* **暂存未追踪的文件**

如果你还想暂存那些新添加到工作目录中但还没有加入版本控制的文件（即未追踪文件），可以使用`-u`或`--include-untracked`选项：

```bash
git stash -u
```

或

```bash
git stash --include-untracked
```

* **暂存忽略文件**

默认`git stash`不会暂存`.gitignore`中忽略的文件。如果你希望连同这些文件一起暂存，可以使用`-a`或`--all`选项：

```bash
git stash -a
```

git stash 是一个非常有用的功能，特别是当你需要快速切换到另一个分支处理一些工作，而你的当前分支有未完成的工作时。它允许你临时保管你的工作进度，防止未完工的更改妨碍其他任务的进行。

## git-rebase {#p2-git-rebase}

将多次提交压缩成一次提交在 Git 中被称为“squash”。这通常在你完成一段工作后，想要将这段时间内的多个提交整理为一个更干净、更整洁的提交记录时使用。Git 提供了几种方法来实现提交的压缩，最常用的是通过 `git rebase` 命令配合交互模式（interactive mode）来实现。

 使用 `git rebase -i` 进行交互式压缩

假设你想压缩最近的 N 次提交。首先，你需要确定从哪个提交开始进行操作。可以通过 `git log` 查看提交历史，然后选择你想要压缩的提交的前一个提交作为起点。

1. **启动交互式 rebase 会话**：

 ```bash
 git rebase -i HEAD~N
 ```

 其中 `N` 是你想要压缩的提交数量。例如，如果你想要压缩最近的 3 次提交，你应该使用 `git rebase -i HEAD~3`。

2. **编辑 rebase 会话中出现的命令列表**：

 执行上述命令后，你的默认文本编辑器会打开一个带有待压缩提交列表的文件。这些提交被列出来，前面默认是 `pick` 命令。

 ```plaintext
 pick e3a1b35 第一次提交的消息
 pick 7ac9a67 第二次提交的消息
 pick 1d2a3f4 第三次提交的消息
 ```

 将除了第一个提交之外的所有 `pick` 命令改为 `squash` 或简写 `s`，表示这些提交将被压缩到前一个提交中。

 ```plaintext
 pick e3a1b35 第一次提交的消息
 squash 7ac9a67 第二次提交的消息
 squash 1d2a3f4 第三次提交的消息
 ```

3. **保存并退出编辑器**：

 一旦保存并关闭编辑器，Git 将开始 rebase 过程，并可能会要求你解决任何合并冲突。然后，它会打开你的文本编辑器，让你编辑最终的提交消息。默认情况下，这会包含你压缩的所有原始提交消息。

4. **完成 rebase 过程**：

 解决完所有冲突（如果有的话）并保存你的最终提交消息之后，你可以完成 rebase 过程。

5. **推送更改到远端仓库（如果需要）**：

 如果你已经将提交推送到了远端仓库，你可能需要使用 `--force` 参数来强制推送更改，**但请注意，这可以覆盖远端仓库的历史，因此仅在确保不会影响他人工作的情况下使用**。

 ```bash
 git push origin your-branch-name --force
 ```

通过这种方法，你可以将多个提交压缩成一个更整洁的提交，以保持项目历史的清晰。

移除某一个指定的 `commit` 通常意味着要在版本控制系统如 Git 中更改历史记录，这通常涉及到一些操作风险，尤其是当这个 `commit` 已经被推送到远程仓库且被其他人使用。下面是几种常见的移除指定 `commit` 的方法，但在进行这些操作前，请确保备份你的代码，以防不测：

 使用 `git rebase` 交互式命令

1. 打开终端或命令行界面。
2. 定位到你的 Git 项目路径下。
3. 执行 `git rebase -i HEAD~X` 命令，`X` 是从当前回到你想要移除的 `commit` 的数量加 1。这条命令会打开一个交互式界面，列出最近的 `X` 次提交。
4. 找到你想要移除的 `commit`，并将其前面的 `pick` 改为 `drop`。或者干脆删除那一行。
5. 保存并关闭编辑器，Git 会自动开始 rebase 进程。

 如果你只是想修改最近的一次 `commit`

如果你仅仅是想移除最近的一次提交，可以这样做：

1. 使用命令 `git reset --soft HEAD~1` 将最后一次提交回退到暂存状态，不影响工作目录。
2. 使用命令 `git reset --hard HEAD~1` 将最后一次提交完全撤销，包括工作目录和暂存区的改变。

 警告

* 修改已经被推送到远程仓库的历史是非常危险的，如果其他人已经基于这些提交做了开发，这将引起合并冲突。
* 如果你需要修改已经推送过的提交，完成上述操作后，需要使用 `git push --force` 来强制推送到远程仓库，这样也会影响到其他协作者的开发进程。

## git bisect {#p4-git-bisect}

确实，当你不确定哪个提交(commit)引入了错误时，Git 提供了一个非常强大的工具 `git bisect` 来帮助你通过二分法快速定位出问题的提交。这个命令通过逐步缩小导致问题的提交范围，最终帮助你找出导致错误的具体提交。使用方法如下：

 如何使用 git bisect

1. **开始 bisect 会话**：
 打开终端或命令行，切换到你的项目目录下，然后使用命令开始一个 bisect 会话：

```shell
git bisect start
```

2. **标记一个坏的提交**：
 使用下面的命令标记当前最新的提交为'坏'的（假设当前分支上的最新提交包含了错误）：

```shell
git bisect bad
```

如果你已经知道一个特定的坏提交，可以指定它：`git bisect bad [坏的提交id]`

3. **标记一个好的提交**：
 接下来，使用以下命令标记一个'好'的提交，即一个没有问题的旧版本：

```shell
git bisect good [好的提交id]
```

这个好的提交应该是你确定不包含当前问题的一次提交。

完成以上步骤之后，`git bisect` 将自动检出一个中间的提交供你测试。你需要编译（如果必要的话）并测试这个版本，然后根据运行结果告诉 Git 这是好是坏：

* 如果这个提交版本没有问题，使用 `git bisect good`。
* 如果这个提交版本有问题，使用 `git bisect bad`。

每次你输入结果后，Git 会继续选择另一个提交进行测试，直至找到第一个'坏'的提交。

 结束 bisect 会话

一旦找到了问题提交，别忘了结束 bisect 会话，释放由 `git bisect` 占用的资源：

```shell
git bisect reset
```

这将会把你的工作目录恢复到 `git bisect` 开始之前的状态。

 注意事项

* 使用 `git bisect` 时，确保有足够的测试覆盖，以准确判断某个提交是好是坏。
* 一旦找到问题提交，你可以通过查看该提交的详情(`git show [提交id]`)来了解更多信息，从而帮助你理解为何会引入错误。

 更加详细的介绍， 可以参考下面文章链接

[资料](https://juejin.cn/post/7232591499069653051)

## git pull 和 git fetch 区别 {#p2-diff-pull-fetch}

`git pull` 和 `git fetch` 是 Git 版本控制系统中的两个基本命令，它们都用于从远程仓库更新本地仓库的信息，但执行的具体操作不同。

 git fetch

* `git fetch` 下载远程仓库最新的内容到你的本地仓库，但它并不自动合并或修改你当前的工作。它取回了远程仓库的所有分支和标签（tags）。
* 运行 `git fetch` 后，你可以在需要时手动执行合并操作（使用 `git merge`）或者重新基于远程仓库的内容进行修改。

* `fetch` 只是将远程变更下载到本地的远程分支跟踪副本中，例如 `origin/master`。

 git pull

* `git pull` 实际上是 `git fetch` 操作之后紧跟一个 `git merge` 操作，它会自动拉取远程仓库的新变更，并尝试合并到当前所在的本地分支中。

* 当你使用 `git pull`，Git 会尝试自动合并变更。这可能会引起冲突（conflicts），当然冲突需要手动解决。

* `git pull` 等价于执行了 `git fetch` 和 `git merge FETCH_HEAD` 的组合。

 使用场景

* 当你仅仅想要查看远程仓库的变动而不立即合并到你的工作，可以使用 `git fetch`。

* 而当你想要立即获取远程的最新变动并快速合并到你的工作中，则可以使用 `git pull`。

## git 仓库迁移应该怎么操作

如果你想迁移仓库并保留原始仓库的所有提交历史、分支和标签，你可以使用以下步骤：

 方法一：使用 `git clone` 和 `git push`

1. **在仓库 B 中创建新的仓库。**

2. **在本地克隆仓库 A：**

```bash
git clone --mirror <仓库 A URL>
cd <仓库 A 目录>
```

使用 `--mirror` 选项克隆仓库会保留所有分支、标签和提交历史。

3. **修改远程仓库地址为仓库 B：**

```bash
git remote set-url --push origin <仓库 B URL>
```

4. **推送到仓库 B：**

```bash
git push --mirror
```

 方法二：使用 `git bundle`

1. **在仓库 A 中创建 bundle 文件：**

```bash
git bundle create repoA.bundle --all
```

2. **将 `repoA.bundle` 文件传输到仓库 B 所在位置。**

3. **在仓库 B 中克隆：**

```bash
git clone repoA.bundle <仓库 B 目录>
```

这两种方法都会保留所有分支、标签和提交历史。选择哪种方法取决于你的具体需求和迁移环境。

**注意：**

* 使用 `--mirror` 或 `--all` 选项在 `git clone` 或 `git bundle` 中时，会将所有的分支和标签复制到目标仓库。
* 在执行之前，请确保仓库 B 是空的或者是一个你可以覆盖的目标仓库，因为这些操作会覆盖目标仓库的内容。
* 如果仓库 A 中包含子模块，你可能需要额外处理子模块的迁移。

## git 中回滚代码有哪些操作？ {#p1-git-revert}

在 Git 中，可以使用以下几种操作来回滚代码：

1. git revert：使用 git revert 命令可以创建一个新的提交来撤销之前的提交。它会创建一个新的提交，恢复之前的更改，从而回滚代码。这种方式比较安全，不会改变历史提交记录。

2. git reset --soft：使用 git reset --soft 命令可以将当前分支的 HEAD 指向指定的提交，同时保留修改。这将撤销指定提交之后的所有提交，但是保留更改的文件在暂存区中，可以用于回滚代码并重新提交。

3. git reset --mixed（默认操作）：使用 git reset --mixed 命令可以将当前分支的 HEAD 指向指定的提交，同时取消之后的提交，但保留修改。这将撤销指定提交之后的所有提交，并重置暂存区的内容，但是不改变工作区的内容，可以用于回滚代码并重新修改后重新提交。

4. git reset --hard：使用 git reset --hard 命令可以将当前分支的 HEAD 指向指定的提交，并丢弃之后的修改。这将撤销指定提交之后的所有提交，并重置工作区和暂存区的内容，慎用，会永久丢失未提交的修改。

需要注意的是，git revert 会保留之前提交的历史记录，而 git reset 则会直接修改历史提交记录。因此，在多人协作或者公共仓库中，建议使用 git revert 来回滚代码，以避免对他人代码的影响。在个人项目或者正在开发中的分支中，可以使用 git reset 更灵活地回滚代码。

## git reset 作用是啥，有哪些操作？ {#p1-git-reset}

git reset 是一个用于撤销提交的命令，可以将当前分支指向某个特定的提交，同时可以选择是否修改工作区和暂存区。

常见的 git reset 操作有以下三种：

1. git reset --soft `<commit>`：将当前分支的 HEAD 指向指定的 commit，并保留之后的修改。这种方式不改变工作区和暂存区的内容，可以用于撤销之前的提交，重新修改后重新提交。

2. git reset --mixed `<commit>`（默认操作）：将当前分支的 HEAD 指向指定的 commit，并取消之后的提交，但保留修改。这种方式会重置暂存区的内容，但不改变工作区的内容，可以用于撤销之前的提交，重新修改后重新提交。

3. git reset --hard `<commit>`：将当前分支的 HEAD 指向指定的 commit，并丢弃之后的修改。这种方式会重置工作区和暂存区的内容，慎用，会永久丢失未提交的修改。

除了上述操作之外，还可以搭配使用 git reset 的其他选项和参数。其中，`<commit>` 可以是一个提交的哈希值、分支名或者标签名，用于指定要回退到的提交。

## git merge 和 git rebase 区别 {#p1-git-merge}

`git merge` 和 `git rebase` 都是用来合并不同分支的命令，但是它们的实现方式和结果不同。

`git merge` 会把两个分支的最新提交点合并起来，生成一个新的合并提交，并且会保留两个分支各自的提交记录，形成一条分支合并的历史线。合并后的代码中，两个分支的修改都会被保留下来。

`git rebase` 也是用来合并分支的，但是它会将当前分支的提交“移动”到目标分支的最后面，然后再将目标分支的修改合并进来。这个过程中，会改变当前分支的提交记录，使它看起来像是在目标分支上进行的修改，从而保持一条干净的提交历史。如果发生冲突，需要手动解决冲突并进行提交。

总的来说，`git merge` 适合用于简单的合并场景，保留分支历史记录，而 `git rebase` 则适合用于合并长期存在分支的场景，可以保持一个干净的提交历史。但是在合并公共分支时，使用 `git rebase` 可能会破坏代码的协作性，因此需要谨慎使用。

---------------------
补充更新：

假设你现在基于远程分支"origin"，创建一个叫"mywork"的分支。

`$ git checkout -b mywork origin`

![image](https://github.com/pro-collection/interview-question/assets/22188674/b40fdca9-4844-4996-b008-f24d0d486acb)

现在我们在这个分支做一些修改，然后生成两个提交(commit).

```
$ vi file.txt
$ git commit
$ vi otherfile.txt
$ git commit
...
```

但是与此同时，有些人也在"origin"分支上做了一些修改并且做了提交了. 这就意味着"origin"和"mywork"这两个分支各自"前进"了，它们之间"分叉"了。

![image](https://github.com/pro-collection/interview-question/assets/22188674/82286270-6422-4b34-a1b3-9d5367b50a78)

在这里，你可以用"pull"命令把"origin"分支上的修改拉下来并且和你的修改合并； 结果看起来就像一个新的"合并的提交"(merge commit):

![image](https://github.com/pro-collection/interview-question/assets/22188674/5f29e4cd-e1c5-4b8d-b4cd-2dd4db047e8a)

但是，如果你想让"mywork"分支历史看起来像没有经过任何合并一样，你也许可以用 `git rebase`

```
git checkout mywork
git rebase origin
```

这些命令会把你的"mywork"分支里的每个提交(commit)取消掉，并且把它们临时 保存为补丁(patch)(这些补丁放到".git/rebase"目录中),然后把"mywork"分支更新 到最新的"origin"分支，最后把保存的这些补丁应用到"mywork"分支上。

![image](https://github.com/pro-collection/interview-question/assets/22188674/e0157351-163a-40e9-85d5-fbc1e35f5ba8)

当'mywork'分支更新之后，它会指向这些新创建的提交(commit),而那些老的提交会被丢弃。 如果运行垃圾收集命令(pruning garbage collection), 这些被丢弃的提交就会删除.

![image](https://github.com/pro-collection/interview-question/assets/22188674/4937b995-8e48-4c32-b101-4fb551b60d01)

现在我们可以看一下用合并(merge)和用rebase所产生的历史的区别：

![image](https://github.com/pro-collection/interview-question/assets/22188674/0d85e67e-8366-4591-8118-50695129dd3c)
![image](https://github.com/pro-collection/interview-question/assets/22188674/b871d1a2-b8e5-4807-9b97-2de8ec103e07)

在rebase的过程中，也许会出现冲突(conflict). 在这种情况，Git会停止rebase并会让你去解决 冲突；在解决完冲突后，用"git-add"命令去更新这些内容的索引(index), 然后，你无需执行 git-commit,只要执行:

`$ git rebase --continue`

这样git会继续应用(apply)余下的补丁。

在任何时候，你可以用--abort参数来终止rebase的行动，并且"mywork" 分支会回到rebase开始前的状态。

`$ git rebase --abort`
