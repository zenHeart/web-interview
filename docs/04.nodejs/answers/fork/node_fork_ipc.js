/**
 * node_fork_ipc.js
 *
 * 目的：演示 child_process.fork 的内置 IPC（process.send/on）能力
 */

const { fork } = require('child_process')

const MODE = process.env.DEMO_MODE

if (MODE === 'FORK_CHILD') {
  console.log('[fork-child] process.send?', typeof process.send === 'function')
  process.on('message', msg => {
    console.log('[fork-child] got from parent:', msg)
    if (typeof process.send === 'function') {
      process.send({ type: 'pong', via: 'ipc', echo: msg })
    }
  })
  setTimeout(() => process.exit(0), 300)
} else {
  // 父进程：仅演示 fork 的 IPC
  (async function main () {
    console.log('== child_process.fork: Node 专用 IPC ==')
    const forked = fork(__filename, [], {
      env: { ...process.env, DEMO_MODE: 'FORK_CHILD' }
    })

    forked.on('message', m => {
      console.log('[parent] from fork-child:', m)
    })
    forked.on('exit', code => {
      console.log('[parent] fork-child exit with code', code)
    })
    forked.send({ type: 'ping', from: 'parent', note: 'hello via IPC' })
  })()
}
