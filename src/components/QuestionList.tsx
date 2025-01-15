import React from 'react'
import { usePluginData } from '@docusaurus/useGlobalData'
import './QuestionList.css' // 引入样式文件

const getGroup = (title) => {
  if (title.toLowerCase().includes('vue')) return 'Vue'
  if (title.toLowerCase().includes('react')) return 'React'
  if (title.toLowerCase().includes('js')) return 'JavaScript'
  if (title.toLowerCase().includes('html')) return 'HTML'
  if (title.toLowerCase().includes('css')) return 'CSS'
  if (title.toLowerCase().includes('.net')) return 'NET'
  return 'Other'
}
function QuestionList () {
  const { questions = [] } = usePluginData('extract-questions-plugin')
  if (!questions || !Array.isArray(questions)) {
    return null // 或者返回一个加载中的提示组件
  }
  const groups = {}
  // 将问题按组分类
  questions.forEach(({ title }) => {
    const group = getGroup(title)
    if (!groups[group]) {
      groups[group] = { group, items: [] }
    }
    groups[group].items.push({ title })
  })

  const groupList = Object.values(groups)

  return (
    <div className="api-reference">
      <h1>Questions Reference</h1>
      {groupList.map(({ group, items }) => (
        <div key={group} className="api-group">
          <h2 className="group-title">{group}</h2>
          <ul className="question-list">
            {items.map(({ title }) => (
              <li key={title} className="question-item">{title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default QuestionList
