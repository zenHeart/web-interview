// 示例：使用 cluster 进行“多进程并发”的任务分发/汇总（非 HTTP 服务）
// 原理：primary 进程按 CPU 核数 fork 多个 worker（独立进程，内存互相隔离），
// 通过进程间 IPC 派发 CPU 密集任务（fib），各 worker 并行计算后回传结果，primary 汇总。
// 与 worker_threads（线程）的区别：
// - worker_threads 在同一进程内创建线程，通信/创建开销更小，可用 SharedArrayBuffer/Atomics 共享内存；
// - cluster 是多进程，稳定性与隔离更好（单个崩溃不影响其他），但内存占用更高、IPC 开销更大；
// 与 child_process 的区别：
// - cluster 基于 child_process，额外提供 worker 管理、重启、（用于服务时的）端口共享与调度；
// - 本例只用其做“任务分发”，等价于“多进程 + IPC”的便捷封装。
// 选型：
// - 纯计算并行优先 worker_threads 或自建进程池；
// - Web 服务多核扩容/端口复用优先 cluster；
// - 强隔离/外部命令执行可用 child_process。

const cluster = require('node:cluster')
const os = require('node:os')

function fib (n) { return n <= 1 ? n : fib(n - 1) + fib(n - 2) }

if (cluster.isPrimary) {
  const cpu = os.cpus().length
  // 要处理的一批 CPU 密集任务（示例）
  const tasks = [35, 36, 37, 38, 35, 36]
  const results = []
  let next = 0; let done = 0

  // 按核数 fork 多个 worker 进程，形成“并行”处理能力
  for (let i = 0; i < cpu; i++) {
    const w = cluster.fork()

    // 接收 worker 的计算结果；若仍有任务则继续派发，实现简单的“拉型调度”
    w.on('message', msg => {
      results.push(msg)
      done++
      if (next < tasks.length) {
        const idx = next++; w.send({ n: tasks[idx], idx })
      } else {
        w.disconnect() // 当前 worker 无任务，关闭其 IPC
      }
      if (done === tasks.length) {
        console.log('results:', results.sort((a, b) => a.idx - b.idx).map(r => r.value))
        process.exit(0)
      }
    })

    // 初次为该 worker 派发任务
    if (next < tasks.length) {
      const idx = next++; w.send({ n: tasks[idx], idx })
    }
  }
} else {
  // worker 进程：接收任务并计算后，通过 IPC 回传结果
  process.on('message', ({ n, idx }) => {
    process.send({ idx, value: fib(n) })
  })
}
