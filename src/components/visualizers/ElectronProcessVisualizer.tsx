import React, { useState } from 'react'
import { useColorMode } from '@site/src/components/hooks/useColorMode'

export default function ElectronProcessVisualizer () {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const [rendererStatus, setRendererStatus] = useState<'normal' | 'crashed' | 'recovering'>('normal')
  const [ipcActive, setIpcActive] = useState(false)
  const [crashReason, setCrashReason] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([
    '[Main] app.whenReady() -> 主进程初始化就绪 (PID: 14022)',
    '[Renderer] BrowserWindow 加载 index.html (PID: 14030, contextIsolation: true)',
    '[Security] preload.js 注入 contextBridge.exposeInMainWorld("electronAPI")'
  ])

  const simulateCrash = (reason: 'crashed' | 'oom') => {
    if (rendererStatus !== 'normal') return
    setRendererStatus('crashed')
    const reasonText = reason === 'crashed' ? 'crashed (SIGSEGV 信号)' : 'oom (内存超限 4GB 溢出)'
    setCrashReason(reasonText)

    setLogs(prev => [
      ...prev,
      `[CRASH ALERT] 渲染进程异常退出: ${reasonText}`,
      '[Main] 捕获 webContents.on("render-process-gone", (e, details) => { ... })',
      '[CrashReporter] 提取 minidump 黑匣子日志并写入 /AppData/Crashpad/reports/',
      '[Main] 启动容灾机制：3秒内检测未频繁崩溃，执行 reloadWebContents()'
    ])

    // 自动容灾恢复
    setTimeout(() => {
      setRendererStatus('recovering')
      setLogs(prev => [...prev, '[Main] 兜底重启渲染进程，重置状态上下文...'])

      setTimeout(() => {
        setRendererStatus('normal')
        setCrashReason(null)
        setLogs(prev => [...prev, '[Renderer] 新渲染进程启动成功 (PID: 14055)，界面恢复正常'])
      }, 1000)
    }, 1500)
  }

  const simulateIpc = () => {
    if (ipcActive || rendererStatus !== 'normal') return
    setIpcActive(true)
    setLogs(prev => [
      ...prev,
      '[Renderer] window.electronAPI.sendLargeData(sharedArrayBuffer 50MB)',
      '[IPC:MessagePort] 启用零拷贝通道传输，规避 structuredClone 序列化耗时',
      '[Main] MessagePort.on("message") 收到 50MB 二进制数据，处理耗时 1.2ms'
    ])
    setTimeout(() => {
      setIpcActive(false)
    }, 1000)
  }

  const bg = isDark ? '#1e1e24' : '#f8f9fa'
  const cardBg = isDark ? '#2b2b36' : '#ffffff'
  const border = isDark ? '#3e3e4f' : '#e2e8f0'
  const textColor = isDark ? '#f1f5f9' : '#1e293b'

  return (
    <div style={{
      border: `1px solid ${border}`,
      borderRadius: '12px',
      backgroundColor: bg,
      color: textColor,
      padding: '1.25rem',
      margin: '1.5rem 0',
      boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>🖥️ Electron 多进程架构与崩溃容灾模拟器</div>
          <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '2px' }}>
            直观演示 Main 主进程守护、Preload 上下文隔离、渲染崩溃捕获与自动兜底重启流程
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => simulateCrash('crashed')}
            disabled={rendererStatus !== 'normal'}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#ef4444',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: rendererStatus === 'normal' ? 'pointer' : 'not-allowed',
              opacity: rendererStatus === 'normal' ? 1 : 0.6
            }}
          >
            💥 触发渲染进程崩溃
          </button>
          <button
            onClick={() => simulateCrash('oom')}
            disabled={rendererStatus !== 'normal'}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#f59e0b',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: rendererStatus === 'normal' ? 'pointer' : 'not-allowed',
              opacity: rendererStatus === 'normal' ? 1 : 0.6
            }}
          >
            ⚠️ 模拟 OOM 内存溢出
          </button>
          <button
            onClick={simulateIpc}
            disabled={rendererStatus !== 'normal' || ipcActive}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#3b82f6',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: rendererStatus === 'normal' && !ipcActive ? 'pointer' : 'not-allowed',
              opacity: rendererStatus === 'normal' && !ipcActive ? 1 : 0.6
            }}
          >
            ⚡ 测试 IPC 零拷贝
          </button>
        </div>
      </div>

      {/* 进程拓扑框 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        {/* Main 进程 */}
        <div style={{
          backgroundColor: cardBg,
          border: '2px solid #3b82f6',
          borderRadius: '8px',
          padding: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ color: '#3b82f6' }}>⚙️ Main 主进程</strong>
            <span style={{ fontSize: '0.7rem', backgroundColor: '#3b82f620', color: '#3b82f6', padding: '2px 6px', borderRadius: '4px' }}>
              Node.js 运行时
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '6px' }}>
            • 窗口生命周期管理 (BrowserWindow)<br />
            • 崩溃守护: {"webContents.on('render-process-gone')"}<br />
            • CrashReporter 黑匣子转储写入
          </div>
        </div>

        {/* Renderer 进程 */}
        <div style={{
          backgroundColor: cardBg,
          border: `2px solid ${rendererStatus === 'crashed' ? '#ef4444' : rendererStatus === 'recovering' ? '#f59e0b' : '#10b981'}`,
          borderRadius: '8px',
          padding: '12px',
          transition: 'all 0.3s'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{
              color: rendererStatus === 'crashed' ? '#ef4444' : rendererStatus === 'recovering' ? '#f59e0b' : '#10b981'
            }}>
              🖼️ Renderer 渲染进程
            </strong>
            <span style={{
              fontSize: '0.7rem',
              backgroundColor: rendererStatus === 'crashed' ? '#ef444420' : '#10b98120',
              color: rendererStatus === 'crashed' ? '#ef4444' : '#10b981',
              padding: '2px 6px',
              borderRadius: '4px'
            }}>
              {rendererStatus === 'crashed' ? '已崩溃 (Dead)' : rendererStatus === 'recovering' ? '容灾恢复中...' : '健康运行中'}
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '6px' }}>
            • Chromium 页面排版与 V8 执行<br />
            • 沙箱隔离 (contextIsolation: true)<br />
            • {crashReason ? `崩溃原因: ${crashReason}` : '页面 UI 与交互状态正常'}
          </div>
        </div>
      </div>

      {/* 实时系统通信与守护日志 */}
      <div style={{
        backgroundColor: isDark ? '#0f172a' : '#1e293b',
        color: '#e2e8f0',
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        borderRadius: '8px',
        padding: '12px 16px',
        lineHeight: 1.6,
        maxHeight: '130px',
        overflowY: 'auto'
      }}>
        {logs.map((log, i) => (
          <div key={i} style={{
            color: log.includes('CRASH') ? '#f87171' : log.includes('容灾') || log.includes('minidump') ? '#facc15' : log.includes('IPC') ? '#38bdf8' : '#cbd5e1'
          }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  )
}
