import React, { useState } from 'react'
import { useColorMode } from '@site/src/components/hooks/useColorMode'

export default function InpVisualizer () {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const [mode, setMode] = useState<'bad' | 'good'>('bad')

  const isGood = mode === 'good'
  const inputDelay = isGood ? 8 : 45
  const processingTime = isGood ? 12 : 180
  const presentationDelay = isGood ? 8 : 65
  const totalInp = inputDelay + processingTime + presentationDelay

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
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>⏱️ Core Web Vitals (INP) 与 LoAF 长动画帧归因</div>
          <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '2px' }}>
            交互体验指标度量：对比同步阻塞长任务 vs 任务切片（Scheduler.yield / rAF）对交互响应的根本性提升
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setMode('bad')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: mode === 'bad' ? '#ef4444' : cardBg,
              color: mode === 'bad' ? '#fff' : textColor,
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: mode === 'bad' ? '#ef4444' : border
            }}
          >
            ❌ 未优化 (Long Task 阻塞)
          </button>
          <button
            onClick={() => setMode('good')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: mode === 'good' ? '#10b981' : cardBg,
              color: mode === 'good' ? '#fff' : textColor,
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: mode === 'good' ? '#10b981' : border
            }}
          >
            ✓ 现代分片优化 (Scheduler / rAF)
          </button>
        </div>
      </div>

      {/* 综合指标状态评级卡 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        borderRadius: '8px',
        backgroundColor: cardBg,
        border: `1px solid ${border}`,
        marginBottom: '1rem'
      }}>
        <div>
          <div style={{ fontSize: '0.8rem', opacity: 0.75 }}>Interaction to Next Paint (INP)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: totalInp > 200 ? '#ef4444' : '#10b981' }}>
            {totalInp} ms
          </div>
        </div>
        <div style={{
          padding: '6px 16px',
          borderRadius: '20px',
          backgroundColor: totalInp > 200 ? '#fee2e2' : '#d1fae5',
          color: totalInp > 200 ? '#b91c1c' : '#047857',
          fontWeight: 700,
          fontSize: '0.9rem'
        }}>
          {totalInp > 200 ? '⚠️ 需要改善 (Poor > 200ms)' : '🎉 体验优秀 (Good ≤ 200ms)'}
        </div>
      </div>

      {/* 三段式甘特耗时分解条 */}
      <div style={{
        backgroundColor: cardBg,
        padding: '1rem',
        borderRadius: '8px',
        border: `1px solid ${border}`,
        marginBottom: '1rem'
      }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
          全链路交互耗时三段式分解 (PerformanceObserver LoAF)
        </div>
        <div style={{ height: '32px', width: '100%', display: 'flex', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{
            width: `${(inputDelay / totalInp) * 100}%`,
            backgroundColor: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            {inputDelay}ms
          </div>
          <div style={{
            width: `${(processingTime / totalInp) * 100}%`,
            backgroundColor: isGood ? '#10b981' : '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            {processingTime}ms
          </div>
          <div style={{
            width: `${(presentationDelay / totalInp) * 100}%`,
            backgroundColor: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            {presentationDelay}ms
          </div>
        </div>

        {/* 图例 */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '10px', fontSize: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#3b82f6', borderRadius: '2px' }} />
            <span>输入排队延迟 (Input Delay: {inputDelay}ms)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', backgroundColor: isGood ? '#10b981' : '#ef4444', borderRadius: '2px' }} />
            <span>JS 业务处理 (Processing: {processingTime}ms)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#f59e0b', borderRadius: '2px' }} />
            <span>呈现渲染排版 (Presentation: {presentationDelay}ms)</span>
          </div>
        </div>
      </div>

      {/* 诊断归因建议 */}
      <div style={{
        backgroundColor: isDark ? '#111827' : '#f1f5f9',
        padding: '10px 14px',
        borderRadius: '6px',
        fontSize: '0.85rem',
        borderLeft: `4px solid ${isGood ? '#10b981' : '#ef4444'}`
      }}>
        {isGood
          ? (
          <div>
            <strong>优化生效策略:</strong> 利用 <code>scheduler.yield()</code> 将 180ms 耗时任务拆散为每片 10ms 的微片段，主线程得以在每次切片间隙响应用户输入和执行下一帧绘制，INP 指标彻底收敛至 28ms！
          </div>
            )
          : (
          <div>
            <strong>瓶颈归因定位:</strong> 主线程在响应点击事件时同步运行密集循环计算，触发了 <code>Long Animation Frame</code>（持续 290ms）。在此期间任何用户的点击、滚动和键盘输入均被严重挂起排队。
          </div>
            )}
      </div>
    </div>
  )
}
