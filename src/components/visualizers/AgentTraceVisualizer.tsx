import React, { useState } from 'react'
import { useColorMode } from '@site/src/components/hooks/useColorMode'

export default function AgentTraceVisualizer () {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0)
  const [streamText, setStreamText] = useState('')
  const [toolApproved, setToolApproved] = useState<boolean | null>(null)

  const runAgentTask = () => {
    setStep(1)
    setStreamText('')
    setToolApproved(null)

    // Step 1: 模拟 SSE 流式打字机吐字
    const textToStream = '正在分析您的构建性能瓶颈，检索到 3 个超大 Chunk...'
    let curIdx = 0
    const timer = setInterval(() => {
      if (curIdx < textToStream.length) {
        setStreamText(textToStream.slice(0, curIdx + 1))
        curIdx++
      } else {
        clearInterval(timer)
        // Step 2: 触发工具调用决策
        setTimeout(() => setStep(2), 600)
      }
    }, 40)
  }

  const handleToolDecision = (approve: boolean) => {
    setToolApproved(approve)
    setStep(3)

    setTimeout(() => {
      setStep(4)
      if (approve) {
        setStreamText(prev => prev + '\n✓ 已调用 [mcp:analyze_bundle] 工具，生成可视化优化方案：已成功剔除重复依赖，体积缩减 42%！')
      } else {
        setStreamText(prev => prev + '\n✗ 用户取消工具调用，已降级输出通用排查建议。')
      }
    }, 800)
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
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>🤖 Agent 前端载体架构：流式输出与 MCP 决策轨迹</div>
          <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '2px' }}>
            演示 SSE 增量吐字、ReAct 规划思考、Model Context Protocol 工具调用与人工确认卡口 (Human-in-the-Loop)
          </div>
        </div>
        <button
          onClick={runAgentTask}
          disabled={step === 1 || step === 3}
          style={{
            padding: '7px 16px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#8b5cf6',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: step === 1 || step === 3 ? 'not-allowed' : 'pointer'
          }}
        >
          {step === 0 ? '▶ 发起 Agent 复杂分析' : '↺ 重新运行演示'}
        </button>
      </div>

      {/* 阶段指示器 */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {['1. 初始指令', '2. SSE 流式响应', '3. MCP 工具决策', '4. 结果回传渲染'].map((title, i) => {
          const isActive = (i === 0 && step >= 0) || (i === 1 && step >= 1) || (i === 2 && step >= 2) || (i === 3 && step >= 4)
          return (
            <div
              key={i}
              style={{
                flex: '1 1 120px',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                textAlign: 'center',
                backgroundColor: isActive ? (isDark ? '#4c1d95' : '#ede9fe') : cardBg,
                color: isActive ? (isDark ? '#c4b5fd' : '#6d28d9') : '#94a3b8',
                border: `1px solid ${isActive ? '#8b5cf6' : border}`
              }}
            >
              {title}
            </div>
          )
        })}
      </div>

      {/* 模拟会话流式交互区 */}
      <div style={{
        backgroundColor: cardBg,
        borderRadius: '8px',
        border: `1px solid ${border}`,
        padding: '1rem',
        minHeight: '160px'
      }}>
        {/* 用户指令 */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '1.2rem' }}>🧑‍💻</span>
          <div style={{
            backgroundColor: isDark ? '#374151' : '#e2e8f0',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '0.85rem'
          }}>
            请帮我分析生产构建产物体积并进行优化建议。
          </div>
        </div>

        {/* Agent 回复 */}
        {step >= 1 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.2rem' }}>🤖</span>
            <div style={{ flex: 1 }}>
              <div style={{
                backgroundColor: isDark ? '#1e1b4b' : '#f5f3ff',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                border: '1px solid #8b5cf640',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6
              }}>
                {streamText}
                {step === 1 && <span style={{ display: 'inline-block', width: '6px', height: '14px', backgroundColor: '#8b5cf6', marginLeft: '4px', verticalAlign: 'middle' }} />}
              </div>

              {/* MCP 工具卡口 (Step 2) */}
              {step === 2 && (
                <div style={{
                  marginTop: '10px',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px dashed #f59e0b',
                  backgroundColor: isDark ? '#451a03' : '#fffbeb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ color: '#d97706', fontSize: '0.85rem' }}>
                      ⚡ MCP 工具调用确认: mcp:analyze_bundle
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: '#b45309' }}>Human-in-the-Loop 门禁</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.85, marginBottom: '10px' }}>
                    Agent 申请读取项目 <code>stats.json</code> 与 <code>vite.config.ts</code> 并执行打包分析。
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleToolDecision(true)}
                      style={{
                        padding: '5px 14px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#10b981',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      ✓ 授权并执行
                    </button>
                    <button
                      onClick={() => handleToolDecision(false)}
                      style={{
                        padding: '5px 14px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#ef4444',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      ✗ 拒绝调用
                    </button>
                  </div>
                </div>
              )}

              {/* 工具调用中 */}
              {step === 3 && (
                <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#8b5cf6' }}>
                  ⏳ 正在通过 Model Context Protocol 协议执行工具 (审批: {toolApproved ? '已通过' : '已拒绝'})...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
