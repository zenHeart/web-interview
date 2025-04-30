import React, { useEffect, useState } from 'react'
import './Progress.css'
import type { Question } from '@site/src/plugins/extractQuestions'
import record from './record.json'

interface ProgressProps {
  questions: Question[];
}

function calculateLeftTime (deadline: string) {
  const leftTime = (new Date(deadline).getTime() - Date.now())
  if (leftTime <= 0) return '已到截止时间'
  const days = Math.floor(leftTime / (1000 * 60 * 60 * 24))
  const hours = Math.floor((leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
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
  const completed = questions.filter((q) => q.meta?.fileH1?.includes?.('✅')).length
  const progress = total > 0 ? (completed / total) * 100 : 0

  // 按学科聚类统计
  const subjectList: string[] = record.SubjectPriority || []
  const subjectProgress = subjectList.map((subject) => {
    const subjectQuestions = questions.filter(q => q.subject === subject)
    const subjectTotal = subjectQuestions.length
    const subjectCompleted = subjectQuestions.filter(q => q.meta?.fileH1?.includes?.('✅')).length
    return {
      subject,
      total: subjectTotal,
      completed: subjectCompleted,
      percent: subjectTotal > 0 ? (subjectCompleted / subjectTotal) * 100 : 0
    }
  })

  const [leftTime, setLeftTime] = useState(() => calculateLeftTime(record.DeadLine))
  const [leftMs, setLeftMs] = useState(() => (new Date(record.DeadLine).getTime() - Date.now()))
  const [avgTimePer, setAvgTimePer] = useState(() => {
    const leftCount = total - completed
    return leftCount > 0 && leftMs > 0 ? formatDuration(Math.floor(leftMs / leftCount)) : '0秒'
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const ms = new Date(record.DeadLine).getTime() - Date.now()
      setLeftTime(calculateLeftTime(record.DeadLine))
      setLeftMs(ms)
      const leftCount = total - completed
      setAvgTimePer(leftCount > 0 && ms > 0 ? formatDuration(Math.floor(ms / leftCount)) : '0秒')
    }, 1000)
    return () => clearInterval(timer)
  }, [total, completed])

  const leftCount = total - completed

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="progress-text">
        {completed}/{total} 已完成 ({progress.toFixed(2)}%)
        <span style={{
          color: '#d32f2f',
          fontWeight: 'bold',
          marginLeft: 16,
          fontSize: 15
        }}>
          {leftTime}
        </span>
        {leftCount > 0 && leftMs > 0 && (
          <span style={{
            color: '#1976d2',
            fontWeight: 'bold',
            marginLeft: 16,
            fontSize: 14
          }}>
            剩余{leftCount}题，平均每题 {avgTimePer}
          </span>
        )}
      </div>
      {/* 新增：各学科进度条 */}
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
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: `${item.percent}%`,
                  height: '100%',
                  background: getColorByIndex(idx, subjectProgress.length),
                  borderRadius: 5,
                  transition: 'width 0.3s'
                }}
              ></div>
            </div>
            <span className="subject-progress-text">
              {item.completed}/{item.total} ({item.percent.toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Progress
