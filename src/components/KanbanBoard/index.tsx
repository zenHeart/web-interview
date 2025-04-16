import { useState } from 'react'
import './KanbanBoard.css'
import { usePluginData } from '@docusaurus/useGlobalData'
import type { Question } from '@site/src/plugins/extractQuestions'
import KanbanSearch, { SearchFilters } from './KanbanSearch'
import PriorityTag from '../PriorityTag'
import record from './record.json'
import Progress from './Progress' // 引入 Progress 组件
const doneKeys = record.Done

function KanbanBoard () {
  const { questions = [] } = usePluginData('extract-questions-plugin') as {
    questions: Question[];
  }
  const [filteredQuestions, setFilteredQuestions] = useState(questions)
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({})

  const handleSearch = (filters: SearchFilters) => {
    let results = questions

    if (filters.subject) {
      results = results.filter((q) =>
        q.subject?.toLowerCase().includes(filters.subject!.toLowerCase())
      )
    }

    if (filters.title) {
      results = results.filter((q) =>
        q.title.toLowerCase().includes(filters.title!.toLowerCase())
      )
    }

    if (filters.topic) {
      results = results.filter((q) =>
        q.topic?.toLowerCase().includes(filters.topic!.toLowerCase())
      )
    }

    if (filters.raw) {
      const searchTerm = filters.raw.toLowerCase()
      results = results.filter(
        (q) =>
          q.title.toLowerCase().includes(searchTerm) ||
          q.subject?.toLowerCase().includes(searchTerm) ||
          q.topic?.toLowerCase().includes(searchTerm)
      )
    }

    if (filters.priority) {
      const searchPriority = filters.priority.toUpperCase()
      results = results.filter((q) =>
        q.priority?.toUpperCase() === searchPriority
      )
    }

    const completedQuestions = questions.filter((q) =>
      doneKeys.some(key => q.link?.includes(key))
    )

    // 从结果中排除已完成的问题
    results = results.filter((q) => {
      const isDone = doneKeys.some(key => q.link?.includes(key))
      return !isDone
    })

    // 将已完成的问题添加到结果中
    results = [...results, ...completedQuestions]

    setFilteredQuestions(results)
  }

  // 将问题按状态和域名分组
  const groupedQuestions = filteredQuestions.reduce((acc, question) => {
    const status = doneKeys.some(key => question.link?.includes(key)) ? 'Done' : (question.status || 'Todo')
    const subject = question.subject || '未分类'

    if (!acc[status]) {
      acc[status] = {}
    }
    if (!acc[status][subject]) {
      acc[status][subject] = []
    }

    acc[status][subject].push(question)
    return acc
  }, {} as Record<string, Record<string, Question[]>>)

  const columns = [
    {
      id: 'Todo',
      title: '待办',
      color: '#4CAF50',
      description: '这个项目还未开始'
    },
    {
      id: 'InProgress',
      title: '进行中',
      color: '#FFA000',
      description: '正在积极开发中'
    },
    {
      id: 'Done',
      title: '已完成',
      color: '#9C27B0',
      description: '已经完成的项目'
    }
  ]

  const toggleGroup = (status: string, subject: string) => {
    const key = `${status}-${subject}`
    setCollapsedGroups((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const getStatusCount = (status: string) => {
    return Object.values(groupedQuestions[status] || {}).flat().length
  }

  return (
    <div className="kanban-container">
      <KanbanSearch onSearch={handleSearch} />
      <Progress questions={questions} /> {/* 插入 Progress 组件 */}
      <div className="kanban-board">
        {columns.map((column) => (
          <div key={column.id} className="kanban-column">
            <div
              className="column-header"
              style={{ borderColor: column.color }}
            >
              <div className="header-title">
                <span
                  className="status-dot"
                  style={{ backgroundColor: column.color }}
                ></span>
                <h2>{column.title}</h2>
                <span className="task-count">{getStatusCount(column.id)}</span>
              </div>
              <div className="header-description">{column.description}</div>
            </div>

            <div className="task-list">
              {Object.entries(groupedQuestions[column.id] || {}).map(
                ([subject, items]) => (
                  <div key={subject} className="subject-group">
                    <div
                      className="subject-header"
                      onClick={() => toggleGroup(column.id, subject)}
                    >
                      <span className="collapse-icon">
                        {collapsedGroups[`${column.id}-${subject}`] ? '▶' : '▼'}
                      </span>
                      <span className="subject-name">{subject}</span>
                      <span className="subject-count">{items.length}</span>
                    </div>

                    {!collapsedGroups[`${column.id}-${subject}`] && (
                      <div className="subject-items">
                        {items.map((question, index) => (
                          <div key={index} className="task-card">
                            <div className="task-title">
                              <a target="_blank" href={question.link} rel="noreferrer">{question.title}</a>
                              {question.priority && (
                                <PriorityTag priority={question.priority} />
                              )}
                            </div>
                            <div className="task-meta">
                              <span className="task-topic">
                                <a href={question.link?.split('#')[0]}>
                                  {question.topic}
                                </a>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KanbanBoard
