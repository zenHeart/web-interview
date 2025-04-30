import React from 'react'
import './Progress.css'
import type { Question } from '@site/src/plugins/extractQuestions'
import record from './record.json'

interface ProgressProps {
  questions: Question[];
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

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="progress-text">
        {completed}/{total} 已完成 ({progress.toFixed(2)}%)
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
