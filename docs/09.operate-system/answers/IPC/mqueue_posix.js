// mqueue_posix.js — 使用 Node 模拟 POSIX 消息队列语义（父/子通过 fork 的 IPC 传递“消息帧”）
// 运行：node mqueue_posix.js
// 说明：父进程充当 mq_receive，子进程执行一次 mq_send；支持最大消息大小与容量。

const { fork } = require('node:child_process')

const MQ_MAXMSG = 10
const MQ_MSGSIZE = 128

if (process.env.ROLE === 'child') {
  // child: mq_send 模拟
  const msg = 'hello via mqueue (node)'
  if (Buffer.byteLength(msg) + 1 > MQ_MSGSIZE) {
    // 模拟 EMSGSIZE
    process.send && process.send({ type: 'error', code: 'EMSGSIZE' })
  } else {
    // priority 简化为固定 1
    process.send && process.send({ type: 'mq_send', prio: 1, data: msg + '\0' })
  }
  process.exit(0)
} else {
  // parent: mq_open + mq_receive 模拟
  const queue = []
  const child = fork(__filename, { env: { ...process.env, ROLE: 'child' } })

  child.on('message', (m) => {
    if (m.type === 'mq_send') {
      if (queue.length >= MQ_MAXMSG) {
        console.error('mq full: dropping message')
        return
      }
      queue.push({ prio: m.prio, data: m.data })
    } else if (m.type === 'error') {
      console.error('child mq_send error:', m.code)
    }
  })

  child.on('exit', () => {
    // mq_receive：取出一条消息（简化：无阻塞/无优先队列排序）
    if (queue.length === 0) {
      console.error('mq_receive: no message')
      return
    }
    const msg = queue.shift()
    // 去除结尾的 \0 模拟 C 字符串
    const text = String(msg.data).replace(/\0+$/, '')
    console.log(`recv (prio ${msg.prio}): ${text}`)
  })
}
