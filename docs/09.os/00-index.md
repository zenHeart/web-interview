# 计算机基础

## 什么是 INode? {#p0-inode}

<Answer>

* inode 是类 Unix 文件系统的 **索引节点**，保存文件元数据（权限、拥有者、时间戳、大小、数据块指针、硬链接计数等），不保存文件名与路径
* 目录是 `名字→inode 编号`的映射，文件名变化不影响 inode；同一 inode 可被多个目录项硬链接引用
* 硬链接共享同一 `inode（计数递增）`，符号链接是独立 `inode`，内容为目标路径
* `inode` 数量可能先耗尽（mkfs 时分配上限），与磁盘空间耗尽是两类问题

**示例说明:**

````bash
# macOS
touch a && ln a b && ln -s a c
ls -li a b c        # 同 inode 编号：a 与 b；c 为独立 inode（符号链接）
stat -x a           # macOS 显示详细 inode 元数据
# Linux
stat a              # Linux 查看 inode/链接计数(blocks, Links)
````

```js
// 可运行的小示例：模拟“目录项 -> inode -> 数据块”的解析打印
const fsIndex = {
  inodes: {
    1001: { mode: '0644', nlink: 2, size: 12, blocks: [201, 202] }, // a,b
    1002: { mode: 'larrow', nlink: 1, target: 'a' } // c (symlink)
  },
  dirents: { a: 1001, b: 1001, c: 1002 }
}
function describe (name) {
  const ino = fsIndex.dirents[name]; const meta = fsIndex.inodes[ino]
  if (!meta) return `${name}: not found`
  if (meta.mode === 'larrow') return `${name} -> ${meta.target} (symlink, inode ${ino})`
  return `${name}: inode=${ino}, links=${meta.nlink}, size=${meta.size}, blocks=[${meta.blocks.join(',')}]`
}
['a', 'b', 'c'].forEach(n => console.log(describe(n)))
```

:::tip
ext4 默认 inode 数量在格式化时决定；大量小文件场景可能“inode 用尽”。`mkfs.ext4` 可用 -T/-i 调整策略。
:::

**延伸阅读**

* [man 7 inode](https://man7.org/linux/man-pages/man7/inode.7.html) — Linux 对 inode 的权威说明
* [ext4 文档](https://www.kernel.org/doc/Documentation/filesystems/ext4.txt) — ext4 元数据与块指针机制
* [APFS Overview](https://support.apple.com/guide/disk-utility/apfs-overview-dsku5f80a614/mac) — macOS 文件系统特性概览
* [ln(1)](https://man7.org/linux/man-pages/man1/ln.1.html) — 硬链接/符号链接行为与选项
* [理解inode](https://www.ruanyifeng.com/blog/2011/12/inode.html) 阮一峰详细讲解 inode 概念

</Answer>

## 软链接和硬链接区别是什么？ {#p0-softlink-hardlink}

<Answer>

**核心概念:**

* 硬链接是多个目录项指向同一 inode 的等价文件名，链接计数 nlink 增加；需在同一文件系统内，通常不允许指向目录
* 软链接（符号链接）是独立 inode，内容为目标路径，可跨文件系统/分区，也可指向目录；目标删除会出现悬挂链接
* 删除行为：删除任一硬链接仅减少 nlink，不影响数据；硬链接全部删除（nlink=0）才回收数据块；软链接删除不影响目标
* 标识与权限：硬链接共享元数据与权限；软链接自身权限与目标分离，最终访问以目标权限判定

**示例说明:**

```bash
# macOS/Linux
rm -f a b c
echo hi > a
ln a b           # 硬链接：a、b 同 inode
ln -s a c        # 软链接：c 指向路径 a
ls -li a b c     # 观察 inode 与链接计数
stat -x a 2>/dev/null || stat a
readlink c       # 打印符号链接目标
rm a && cat b    # 仍可读；硬链接保留数据
cat c || echo "dangling symlink"  # 目标丢失后变悬挂
```

```js
// 可运行脚本：区分硬/软链接（Node.js）
import { writeFile, link, symlink, lstat } from 'fs/promises'

const files = ['a', 'b', 'c']
const show = async f => {
  try {
    const s = await lstat(f)
    console.log(f, { ino: s.ino, nlink: s.nlink, symlink: s.isSymbolicLink() })
  } catch { console.log(f, 'missing') }
}

await writeFile('a', 'hi\n')
await link('a', 'b').catch(() => {})
await symlink('a', 'c').catch(() => {})
for (const f of files) await show(f)
```

:::tip
硬链接不能跨文件系统且一般不可指向目录；符号链接的相对路径按“链接所在目录”为基准解析，迁移目录时优先使用相对路径以提升可移植性。
:::

**延伸阅读:**

* [man 1 ln](https://man7.org/linux/man-pages/man1/ln.1.html) — ln 选项与行为
* [man 7 inode](https://man7.org/linux/man-pages/man7/inode.7.html) — inode 与链接计数
* [GNU Coreutils ln](https://www.gnu.org/software/coreutils/manual/html_node/ln-invocation.html) — 细节与兼容性
* [APFS 概览](https://support.apple.com/guide/disk-utility/apfs-overview-dsku5f80a614/mac) — macOS 文件系统要点

</Answer>

## 了解文件系统么，知道哪些常见的文件系统格式，有什么区别? {#p1-filsystem}

<Answer>

* 文件系统是，如何在介质上组织数据与元数据的规范；关键维度：`日志/CoW、快照/克隆、校验、权限与ACL、大小写敏感、最大文件/卷、碎片与并发`
* 常见类型：`ext4、XFS、Btrfs、ZFS、APFS、HFS+、NTFS、FAT32、exFAT`
* 选择建议：Linux服务器优先 ext4/XFS；需要快照/校验用 Btrfs/ZFS；macOS 用 APFS；跨平台U盘选 exFAT；极旧设备用 FAT32
* 取舍：跨平台兼容 vs 高级特性，数据库类负载谨慎使用 CoW（Btrfs/ZFS）或关闭 CoW/用单独池

|FS|平台|关键特性|限制/适用|
|:--|:--|:--|:--|
|ext4|Linux|日志、成熟稳定|原生快照/端到端校验缺失；通用服务器|
|XFS|Linux|大文件/并发强、在线扩容|在线收缩弱；小文件场景注意|
|Btrfs|Linux|CoW、快照/子卷、校验|磁盘吃满时维护复杂；数据库负载需评估|
|ZFS|多平台|CoW、端到端校验、快照、RAIDZ|占内存、部署复杂；许可证/内核模块|
|APFS|macOS|CoW、快照、克隆、原生加密|默认大小写不敏感；苹果生态|
|NTFS|Windows|ACL、压缩、备用数据流|mac 写需驱动；默认不区分大小写|
|exFAT|跨平台|大文件支持、轻量|无权限/日志；移动介质|
|FAT32|跨平台|兼容最广|单文件≤4GB、无权限；老设备|

**示例说明:**

```js
// 检测当前目录的文件系统类型与大小写敏感性（Node.js）
import { writeFile, unlink } from 'fs/promises'
import { execSync } from 'child_process'
import { platform } from 'node:process'

function fsType () {
  try {
    if (platform === 'darwin') return execSync('stat -f %T .').toString().trim()
    if (platform === 'linux') return execSync('stat -f -c %T .').toString().trim()
    if (platform === 'win32') return execSync('powershell -NoProfile -Command "(Get-Volume -DriveLetter (Get-Item .).PSDrive.Name).FileSystem"').toString().trim()
  } catch {}
  return 'unknown'
}
async function caseSensitivity () {
  const A = 'FS_CASE_A'; const a = 'fs_case_a'
  await writeFile(A, 'x').catch(() => {})
  try {
    await writeFile(a, 'y') // 在大小写不敏感 FS 上可能 EEXIST
    await unlink(a); await unlink(A).catch(() => {})
    return 'case-sensitive'
  } catch {
    await unlink(A).catch(() => {})
    return 'case-insensitive'
  }
}
(async () => {
  console.log('fsType:', fsType())
  console.log('case:', await caseSensitivity())
})()
```

:::tip
大小写不敏感的 FS（如默认 APFS/NTFS）会放大代码中大小写不一致的 import 问题，CI/容器（ext4）常因此构建失败。
:::

**延伸阅读:**

* [Kernel: ext4](https://www.kernel.org/doc/Documentation/filesystems/ext4.txt) — 设计与特性
* [Kernel: XFS](https://docs.kernel.org/filesystems/xfs.html) — 大文件与并发优势
* [Btrfs Wiki](https://btrfs.wiki.kernel.org/) — 子卷/快照/校验/配额
* [OpenZFS Docs](https://openzfs.github.io/openzfs-docs/) — CoW与端到端校验、池与RAIDZ
* [Apple: APFS Overview](https://support.apple.com/guide/disk-utility/apfs-overview-dsku5f80a614/mac) — 快照/克隆/加密
* [Microsoft: NTFS](https://learn.microsoft.com/windows/win32/fileio/ntfs-technical-reference) — ACL/备用数据流
* [Microsoft: exFAT Spec](https://learn.microsoft.com/windows/win32/fileio/exfat-specification) — 跨平台移动介质首选

</Answer>

## 进程和线程区别 {#p0-process-thread}

<Answer>

* 进程是资源分配与隔离单位（独立地址空间/句柄/权限），线程是调度与执行单位（共享进程资源）
* 进程更稳健但切换开销大；线程切换轻量但需同步，易出现数据竞争
* 通信与故障域不同：进程用 IPC、线程共享内存；进程崩溃影响面更小

|维度|进程|线程|
|---|---|---|
|定义|程序一次执行实例，资源与隔离单位|进程内的执行流，调度单位|
|地址空间|彼此独立，互不可见|共享进程地址空间|
|资源拥有|文件句柄/网络/权限独立|共享文件句柄/堆/全局对象|
|调度与开销|调度/切换开销大，创建慢|调度/切换轻，创建快|
|通信方式|管道/消息队列/共享内存/Socket（IPC）|共享内存+锁/原子/条件变量|
|故障与隔离|崩溃通常不影响其他进程|崩溃可能拖垮同一进程|
|典型场景|多服务隔离、稳定性优先、不同语言/权限|CPU密集并行、细粒度并发、同一进程内协作|

**实践取舍:**

* 性能+低延迟且可控同步 → 优先线程；稳定性/隔离/差权限 → 优先多进程
* 高并发 I/O：多进程或事件驱动+少量工作线程；CPU 密集计算：线程/进程池
* 最小权限、监控与熔断要跟随边界：进程级更易治理

**延伸阅读:**

* [Linux man-pages: fork](https://man7.org/linux/man-pages/man2/fork.2.html) — 进程创建与地址空间
* [Linux man-pages: pthreads](https://man7.org/linux/man-pages/man7/pthreads.7.html) — 线程与同步原语
* [Windows: Processes and Threads](https://learn.microsoft.com/windows/win32/procthread/processes-and-threads) — Windows 进程/线程模型概览

</Answer>

## 什么是 IPC? {#p0-ipc}

// ...existing code...

## 什么是 IPC? {#p0-ipc}

// ...existing code...

## 什么是 IPC? {#p0-ipc}

<Answer>

IPC（Inter-Process Communication）是不同进程在独立地址空间间交换数据/事件的机制，常见机制：管道/FIFO、消息队列、共享内存+同步、Unix/TCP/UDP 套接字、信号。

共享内存吞吐最高但需同步；队列有序缓冲；Socket 通用可跨机；管道简单但多为单向字节流。

|机制|通信语义|优点|局限/适用|
|:--|:--|:--|:--|
|管道/FIFO|字节流、通常单向|简单、零配置|同机、父子/同属；小规模流水线|
|消息队列|消息帧、有序缓冲|解耦、可限流|容量上限/实现差异；控制面|
|共享内存+同步|共享地址、需加锁|吞吐/延迟最佳|同步复杂，仅同机|
|Unix 域套接字|流/报文|低开销、可传句柄|同机、需权限|
|TCP/UDP 套接字|跨主机|最通用、可路由|协议/可靠性自管；网络开销|
|信号|短通知|低成本|载荷极少，仅控制|

:::tip
Node 中 fork/cluster 才有 process.send/on('message') 的 IPC 通道；spawn/exec 默认仅有标准流（需自行分帧）。
:::

**延伸阅读:**

* [man 7 pipe](https://man7.org/linux/man-pages/man7/pipe.7.html) — 管道/命名管道语义与限制
* [man 7 unix](https://man7.org/linux/man-pages/man7/unix.7.html) — Unix 域套接字与句柄传递
* [man 7 shm_overview](https://man7.org/linux/man-pages/man7/shm_overview.7.html) — 共享内存概览与同步
* [man 7 mq_overview](https://man7.org/linux/man-pages/man7/mq_overview.7.html) — POSIX 消息队列
* [man 7 socket](https://man7.org/linux/man-pages/man7/socket.7.html) — 套接字通用接口

</Answer>

## 权限管理模型相关概念 {#p2-manage}

<Answer>

**核心概念:**

* 操作系统常见权限模型
  * **DAC（资源所有者自主授权）** DAC 易用但容易产生越权
  * **MAC（管理员强制标签/级别）** MAC 安全最强但可用性低
  * **RBAC（按角色聚合权限）** RBAC 简化管理但易角色爆炸
  * **ABAC（按用户/资源/环境属性评估）** ABAC 细粒度灵活但策略复杂
  * **PBAC（以策略语言集中治理，常作为RBAC/ABAC的策略化实现）**
* 组合实践
  * 企业常用 `RBAC+ABAC`（角色给基线权限，属性做细化）
  * 高安全领域采用 `MAC+审计`
  * 文件系统常见 `DAC+ACL`
* 典型实现
  * NTFS/Unix `ACL（DAC）`
  * SELinux/AppArmor `（MAC）`
  * Kubernetes `RBAC`
  * AWS IAM/OPA Rego/XACML `（PBAC/ABAC`

**延伸阅读:**

* [NIST SP 800-162: ABAC](https://csrc.nist.gov/publications/detail/sp/800-162/final) — ABAC 概念与实施指南
* [NIST RBAC Model](https://csrc.nist.gov/Projects/Role-Based-Access-Control) — RBAC 标准与参考模型
* [SELinux](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/using_selinux/index) — MAC 的典型实现与策略
* [OASIS XACML](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=xacml) — 策略语言标准，PBAC/ABAC 常用
* [OPA Rego](https://www.openpolicyagent.org/docs/latest/) — 开源策略引擎，落地 PBAC/ABAC

</Answer>
