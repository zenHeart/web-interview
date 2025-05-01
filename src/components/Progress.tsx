import React, { useEffect, useState } from 'react'
import './Progress.css'
import type { Question } from '@site/src/plugins/extractQuestions'
import record from './KanbanBoard/record'
import { usePluginData } from '@docusaurus/useGlobalData'

interface ProgressProps {
  questions: Question[];
}

function calculateLeftTime (deadline: string) {
  const leftTime = new Date(deadline).getTime() - Date.now()
  if (leftTime <= 0) return '已到截止时间'
  const days = Math.floor(leftTime / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((leftTime % (1000 * 60)) / 1000)
  return `剩余 ${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`
}

function formatDuration (ms: number) {
  if (ms <= 0) return '0秒'
  const days = Math.floor(ms / (1000 * 60 * 60 * 24))
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((ms % (1000 * 60)) / 1000)
  let str = ''
  if (days > 0) str += `${days}天`
  if (hours > 0) str += `${hours}小时`
  if (minutes > 0) str += `${minutes}分钟`
  if (seconds > 0 || !str) str += `${seconds}秒`
  return str
}

const getColorByIndex = (idx: number, total: number) => {
  // 绿色到灰色色阶
  const start = [76, 175, 80] // #4CAF50
  const end = [200, 200, 200] // #C8C8C8
  const ratio = total <= 1 ? 0 : idx / (total - 1)
  const r = Math.round(start[0] + (end[0] - start[0]) * ratio)
  const g = Math.round(start[1] + (end[1] - start[1]) * ratio)
  const b = Math.round(start[2] + (end[2] - start[2]) * ratio)
  return `rgb(${r},${g},${b})`
}

const Progress: React.FC<ProgressProps> = ({ questions }) => {
  const total = questions.length
  const completed = questions.filter((q) =>
    q.meta?.fileH1?.includes?.('✅') || record.Done.some(key => q.link?.includes(key))
  ).length
  const progress = total > 0 ? (completed / total) * 100 : 0

  // 按学科聚类统计
  const subjectList: string[] = record.SubjectPriority || []
  const subjectProgress = subjectList.map((subject) => {
    const subjectQuestions = questions.filter((q) => q.subject === subject)
    const subjectTotal = subjectQuestions.length
    const subjectCompleted = subjectQuestions.filter((q) =>
      q.meta?.fileH1?.includes?.('✅') || record.Done.some(key => q.link?.includes(key))
    ).length
    return {
      subject,
      total: subjectTotal,
      completed: subjectCompleted,
      percent: subjectTotal > 0 ? (subjectCompleted / subjectTotal) * 100 : 0
    }
  })

  const [leftTime, setLeftTime] = useState(() =>
    calculateLeftTime(record.DeadLine)
  )
  const [leftMs, setLeftMs] = useState(
    () => new Date(record.DeadLine).getTime() - Date.now()
  )
  const [avgTimePer, setAvgTimePer] = useState(() => {
    const leftCount = total - completed
    return leftCount > 0 && leftMs > 0
      ? formatDuration(Math.floor(leftMs / leftCount))
      : '0秒'
  })
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const ms = new Date(record.DeadLine).getTime() - Date.now()
      setLeftTime(calculateLeftTime(record.DeadLine))
      setLeftMs(ms)
      const leftCount = total - completed
      setAvgTimePer(
        leftCount > 0 && ms > 0
          ? formatDuration(Math.floor(ms / leftCount))
          : '0秒'
      )
    }, 1000)
    return () => clearInterval(timer)
  }, [total, completed])

  // 悬浮按钮点击事件
  const handleToggleDetail = () => setShowDetail(v => !v)

  // 点击弹窗外部关闭
  useEffect(() => {
    if (!showDetail) return
    const onClick = (e: MouseEvent) => {
      const detail = document.getElementById('progress-detail-popup')
      if (detail && !detail.contains(e.target as Node)) setShowDetail(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [showDetail])

  const leftCount = total - completed

  return (
    <>
      {/* 悬浮环形进度按钮 */}
      <div
        className="progress-fab"
        onClick={handleToggleDetail}
        title="查看学习进度"
      >
      <svg width="64" height="64" viewBox="0 0 64 64" style={{ position: 'absolute', left: 0, top: 0 }}>
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="#f3f5f7"
          strokeWidth="4"
        />
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="rgb(76, 175, 80)"
          strokeWidth="4"
          strokeDasharray={2 * Math.PI * 28}
          strokeDashoffset={2 * Math.PI * 28 * (1 - progress / 100)}
          strokeLinecap="round"
          transform="rotate(-90 32 32)"
          style={{ transition: 'stroke-dashoffset 0.4s' }}
        />
      </svg>
      <span style={{
        position: 'relative',
        zIndex: 1,
        fontSize: 22,
        fontWeight: 500,
        color: '#888'
      }}>
        {Math.round(progress)}%
      </span>
      </div>
      {/* 详细进度弹窗 */}
      {showDetail && (
        <div
          id="progress-detail-popup"
          className="progress-detail-popup"
        >
          {/* 关闭按钮 */}
          <span
            className="close-button"
            onClick={() => setShowDetail(false)}
            title="关闭"
          >
            ×
          </span>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 18 }}>
            学习进度详情
          </div>
          <div className="progress-bar" style={{
            width: '100%',
            height: 8,
            background: '#eee',
            borderRadius: 4,
            marginBottom: 10,
            position: 'relative'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: '#4caf50',
              borderRadius: 4,
              transition: 'width 0.3s'
            }}></div>
          </div>
          <div className="progress-text" style={{ marginBottom: 10 }}>
            {completed}/{total} 已完成 ({progress.toFixed(0)}%)
            <p
              style={{
                color: '#d32f2f',
                fontWeight: 'bold',
                fontSize: '15px',
                margin: 0,
                lineHeight: '20px'
              }}
            >
              {leftTime}
            </p>
            {leftCount > 0 && leftMs > 0 && (
              <p
                style={{
                  color: '#1976d2',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  margin: 0,
                  lineHeight: '20px'
                }}
              >
                剩余{leftCount}题，平均每题 {avgTimePer}
              </p>
            )}
          </div>
          {/* 各学科进度条 */}
          <div className="subject-progress-list">
            {subjectProgress.map((item, idx) => (
              <div className="subject-progress-row" key={item.subject}>
                <span className="subject-progress-label">{item.subject}</span>
                <div
                  className="subject-progress-bar"
                  style={{
                    width: '60%',
                    background: '#eee',
                    display: 'inline-block',
                    margin: '0 8px',
                    height: 10,
                    borderRadius: 5,
                    verticalAlign: 'middle',
                    position: 'relative',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                  }}
                >
                  <div
                    style={{
                      width: `${item.percent}%`,
                      height: '100%',
                      background: getColorByIndex(idx, subjectProgress.length),
                      borderRadius: 5,
                      transition: 'width 0.3s',
                      position: 'relative'
                    }}
                  ></div>
                  {/* 进度条上高亮显示比例 */}
                  <span
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%,-50%)',
                      fontSize: 12,
                      fontWeight: 700,
                      color: item.percent > 50 ? '#fff' : '#388e3c',
                      textShadow: item.percent > 50 ? '0 1px 2px #388e3c' : 'none',
                      pointerEvents: 'none'
                    }}
                  >
                    {item.completed}/{item.total}
                  </span>
                </div>
                <span className="subject-progress-text">
                  {item.percent.toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function ProgressBar () {
  const { questions = [] } = usePluginData('extract-questions-plugin') as {
    questions: Question[];
  }
  return <Progress questions={questions} />
}
export default ProgressBar
