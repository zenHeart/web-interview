import React, { useState } from 'react'
import { useColorMode } from '@site/src/components/hooks/useColorMode'

export default function StranglerVisualizer () {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const stages = [
    {
      label: '阶段 0: 准备期 (0%)',
      newTraffic: 0,
      oldTraffic: 100,
      complexity: 48,
      buildTime: '8m 40s',
      desc: '反向代理 (Nginx/Gateway) 接入全局流量，全量转发至 Legacy 巨石单体应用。'
    },
    {
      label: '阶段 1: 边缘切流 (25%)',
      newTraffic: 25,
      oldTraffic: 75,
      complexity: 39,
      buildTime: '6m 10s',
      desc: '非核心模块（用户设置、静态内容）迁移至新现代化架构，网关按路由规则分流。'
    },
    {
      label: '阶段 2: 核心攻坚 (70%)',
      newTraffic: 70,
      oldTraffic: 30,
      complexity: 18,
      buildTime: '2m 15s',
      desc: '核心业务（交易看板、结算流）完成微前端/独立工程重构，双写校验数据一致性。'
    },
    {
      label: '阶段 3: 完整绞杀 (100%)',
      newTraffic: 100,
      oldTraffic: 0,
      complexity: 6,
      buildTime: '28s',
      desc: '老系统完全下线退役 (Sunsetting)，代码库剥离归档，零停机完成现代化演进！'
    }
  ]

  const [currentStageIdx, setCurrentStageIdx] = useState(1)
  const cur = stages[currentStageIdx]

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
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>🌿 遗留系统「绞杀者模式 (Strangler Fig)」演进模拟器</div>
        <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '2px' }}>
          拖动进度滑块，直观感受反向代理切流、新老系统共存到最终完全退役的全生命周期
        </div>
      </div>

      {/* 阶段选择器 */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {stages.map((st, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStageIdx(idx)}
            style={{
              flex: '1 1 120px',
              padding: '8px 12px',
              borderRadius: '6px',
              border: `1px solid ${idx === currentStageIdx ? '#3b82f6' : border}`,
              backgroundColor: idx === currentStageIdx ? (isDark ? '#1d4ed8' : '#3b82f6') : cardBg,
              color: idx === currentStageIdx ? '#fff' : textColor,
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {st.label.split(':')[0]}
          </button>
        ))}
      </div>

      {/* 流量分流可视化条 */}
      <div style={{
        backgroundColor: cardBg,
        padding: '1rem',
        borderRadius: '8px',
        border: `1px solid ${border}`,
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
          <span style={{ color: '#10b981', fontWeight: 600 }}>✨ 现代新系统: {cur.newTraffic}%</span>
          <span style={{ color: '#ef4444', fontWeight: 600 }}>🏛️ 遗留老系统: {cur.oldTraffic}%</span>
        </div>
        <div style={{ height: '24px', width: '100%', display: 'flex', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{
            width: `${cur.newTraffic}%`,
            backgroundColor: '#10b981',
            transition: 'width 0.5s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}>
            {cur.newTraffic > 10 ? `${cur.newTraffic}%` : ''}
          </div>
          <div style={{
            width: `${cur.oldTraffic}%`,
            backgroundColor: '#ef4444',
            transition: 'width 0.5s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}>
            {cur.oldTraffic > 10 ? `${cur.oldTraffic}%` : ''}
          </div>
        </div>
      </div>

      {/* 指标卡片对比 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ backgroundColor: cardBg, padding: '12px', borderRadius: '8px', border: `1px solid ${border}` }}>
          <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>核心模块最高圈复杂度</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: cur.complexity > 20 ? '#ef4444' : '#10b981' }}>
            {cur.complexity}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
            {cur.complexity > 20 ? '高风险坏味道' : '可维护性优良'}
          </div>
        </div>

        <div style={{ backgroundColor: cardBg, padding: '12px', borderRadius: '8px', border: `1px solid ${border}` }}>
          <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>CI/CD 增量构建耗时</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#3b82f6' }}>
            {cur.buildTime}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
            从全量单体向微模块缓存演进
          </div>
        </div>
      </div>

      {/* 当前架构描述 */}
      <div style={{
        backgroundColor: isDark ? '#111827' : '#f1f5f9',
        padding: '10px 14px',
        borderRadius: '6px',
        fontSize: '0.85rem',
        borderLeft: '4px solid #3b82f6'
      }}>
        <strong>架构动作:</strong> {cur.desc}
      </div>
    </div>
  )
}
