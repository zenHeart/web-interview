import React, { useState } from 'react'
import { useColorMode } from '@site/src/components/hooks/useColorMode'

interface NodeState {
  id: string
  name: string
  type: 'component' | 'util' | 'entry'
  hasBoundary: boolean
  status: 'idle' | 'dirty' | 'bubbling' | 'accepted' | 'reloaded'
}

export default function ViteHmrVisualizer () {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const [activeScenario, setActiveScenario] = useState<'boundary' | 'no-boundary'>('boundary')
  const [isSimulating, setIsSimulating] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    '[vite] dev server running at http://localhost:5173',
    '[vite] connected to client ws://localhost:5173'
  ])

  const [nodes, setNodes] = useState<Record<string, NodeState>>({
    entry: { id: 'entry', name: 'main.ts', type: 'entry', hasBoundary: false, status: 'idle' },
    app: { id: 'app', name: 'App.vue', type: 'component', hasBoundary: false, status: 'idle' },
    chart: { id: 'chart', name: 'ChartWidget.vue', type: 'component', hasBoundary: true, status: 'idle' },
    format: { id: 'format', name: 'math/format.ts', type: 'util', hasBoundary: false, status: 'idle' }
  })

  const triggerUpdate = (scenario: 'boundary' | 'no-boundary') => {
    if (isSimulating) return
    setIsSimulating(true)
    setActiveScenario(scenario)

    const updatedChartBoundary = scenario === 'boundary'
    setNodes(prev => ({
      ...prev,
      chart: { ...prev.chart, hasBoundary: updatedChartBoundary, status: 'idle' },
      format: { ...prev.format, status: 'dirty' },
      app: { ...prev.app, status: 'idle' },
      entry: { ...prev.entry, status: 'idle' }
    }))

    const newLogs = [
      '[vite:hmr] 文件修改触发: /src/math/format.ts',
      '[vite:hmr] 遍历依赖图 ModuleGraph 收集受影响的 importers...'
    ]
    setLogs(newLogs)

    // Step 1: Bubbling to ChartWidget
    setTimeout(() => {
      setNodes(prev => ({
        ...prev,
        chart: { ...prev.chart, status: 'bubbling' }
      }))
      setLogs(l => [...l, '[vite:hmr] 向上冒泡检查依赖方: ChartWidget.vue'])

      // Step 2: Check boundary
      setTimeout(() => {
        if (updatedChartBoundary) {
          setNodes(prev => ({
            ...prev,
            chart: { ...prev.chart, status: 'accepted' },
            format: { ...prev.format, status: 'accepted' }
          }))
          setLogs(l => [
            ...l,
            '[vite:hmr] 命中 import.meta.hot.accept() 边界！',
            '[vite:ws] 发送更新事件 -> { type: \'js-update\', path: \'/src/ChartWidget.vue\' }',
            '[vite:client] 成功执行局部组件热替换 (0 DOM reload, 18ms)'
          ])
          setIsSimulating(false)
        } else {
          // Bubbles further to App and Entry
          setNodes(prev => ({
            ...prev,
            app: { ...prev.app, status: 'bubbling' }
          }))
          setLogs(l => [...l, '[vite:hmr] ChartWidget 未声明 accept 边界，继续向上冒泡至 App.vue'])

          setTimeout(() => {
            setNodes(prev => ({
              ...prev,
              entry: { ...prev.entry, status: 'reloaded' },
              app: { ...prev.app, status: 'reloaded' },
              chart: { ...prev.chart, status: 'reloaded' },
              format: { ...prev.format, status: 'reloaded' }
            }))
            setLogs(l => [
              ...l,
              '[vite:hmr] 冒泡至根节点未找到任何 HMR 边界！',
              '[vite:ws] 发送事件 -> { type: \'full-reload\' }',
              '[vite:client] 降级执行整页刷新 window.location.reload()'
            ])
            setIsSimulating(false)
          }, 700)
        }
      }, 700)
    }, 600)
  }

  const bg = isDark ? '#1e1e24' : '#f8f9fa'
  const cardBg = isDark ? '#2b2b36' : '#ffffff'
  const border = isDark ? '#3e3e4f' : '#e2e8f0'
  const textColor = isDark ? '#f1f5f9' : '#1e293b'

  const getNodeColor = (status: NodeState['status']) => {
    switch (status) {
      case 'dirty': return '#f59e0b'
      case 'bubbling': return '#3b82f6'
      case 'accepted': return '#10b981'
      case 'reloaded': return '#ef4444'
      default: return isDark ? '#374151' : '#e5e7eb'
    }
  }

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
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>⚡ Vite 模块热更新 (HMR) 冒泡与边界动态模拟</span>
          <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '2px' }}>
            修改底层模块，观察 Vite 如何在依赖图拓扑中向上查找 `hot.accept` 边界
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => triggerUpdate('boundary')}
            disabled={isSimulating}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#10b981',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: isSimulating ? 'not-allowed' : 'pointer',
              opacity: isSimulating ? 0.6 : 1
            }}
          >
            场景 1: 局部 HMR 替换
          </button>
          <button
            onClick={() => triggerUpdate('no-boundary')}
            disabled={isSimulating}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#ef4444',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: isSimulating ? 'not-allowed' : 'pointer',
              opacity: isSimulating ? 0.6 : 1
            }}
          >
            场景 2: 降级 Full Reload
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: cardBg,
        borderRadius: '8px',
        border: `1px solid ${border}`,
        marginBottom: '1rem'
      }}>
        <div style={{
          border: `2px solid ${getNodeColor(nodes.entry.status)}`,
          padding: '10px',
          borderRadius: '8px',
          textAlign: 'center',
          transition: 'all 0.3s'
        }}>
          <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>入口根模块</div>
          <div style={{ fontWeight: 'bold' }}>{nodes.entry.name}</div>
          <div style={{ fontSize: '0.7rem', marginTop: '4px', color: '#64748b' }}>无接受边界</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', opacity: 0.5 }}>
          ← 导入
        </div>

        <div style={{
          border: `2px solid ${getNodeColor(nodes.app.status)}`,
          padding: '10px',
          borderRadius: '8px',
          textAlign: 'center',
          transition: 'all 0.3s'
        }}>
          <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>父组件</div>
          <div style={{ fontWeight: 'bold' }}>{nodes.app.name}</div>
          <div style={{ fontSize: '0.7rem', marginTop: '4px', color: '#64748b' }}>无接受边界</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', opacity: 0.5 }}>
          ← 导入
        </div>

        <div style={{
          border: `2px solid ${getNodeColor(nodes.chart.status)}`,
          padding: '10px',
          borderRadius: '8px',
          textAlign: 'center',
          transition: 'all 0.3s'
        }}>
          <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>业务组件</div>
          <div style={{ fontWeight: 'bold' }}>{nodes.chart.name}</div>
          <div style={{
            fontSize: '0.7rem',
            marginTop: '4px',
            color: activeScenario === 'boundary' ? '#10b981' : '#ef4444',
            fontWeight: 600
          }}>
            {activeScenario === 'boundary' ? '✓ 含 hot.accept' : '✗ 无 hot.accept'}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', opacity: 0.5 }}>
          ← 导入
        </div>

        <div style={{
          border: `2px solid ${getNodeColor(nodes.format.status)}`,
          padding: '10px',
          borderRadius: '8px',
          textAlign: 'center',
          transition: 'all 0.3s'
        }}>
          <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>修改源头 (Leaf)</div>
          <div style={{ fontWeight: 'bold' }}>{nodes.format.name}</div>
          <div style={{ fontSize: '0.7rem', marginTop: '4px', color: '#f59e0b', fontWeight: 600 }}>触发编辑</div>
        </div>
      </div>

      <div style={{
        backgroundColor: isDark ? '#0f172a' : '#1e293b',
        color: '#38bdf8',
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        borderRadius: '8px',
        padding: '12px 16px',
        lineHeight: 1.6,
        maxHeight: '140px',
        overflowY: 'auto'
      }}>
        {logs.map((log, i) => (
          <div key={i} style={{ color: log.includes('成功') ? '#4ade80' : log.includes('降级') ? '#f87171' : log.includes('accept') ? '#facc15' : '#e2e8f0' }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  )
}
