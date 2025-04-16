import React from 'react'
import './Progress.css' // 确保样式与现有看板样式兼容
import type { Question } from '@site/src/plugins/extractQuestions'

interface ProgressProps {
  questions: Question[];
}

const Progress: React.FC<ProgressProps> = ({ questions }) => {
  const total = questions.length
  const completed = questions.filter((q) => q.meta?.fileH1?.includes?.('✅')).length
  const progress = total > 0 ? (completed / total) * 100 : 0

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="progress-text">
        {completed}/{total} 已完成 ({progress.toFixed(2)}%)
      </div>
    </div>
  )
}

export default Progress
