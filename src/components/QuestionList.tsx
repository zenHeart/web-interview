import React from 'react'
import './QuestionList.css'
import { usePluginData } from '@docusaurus/useGlobalData'
import type { KnowledgeMap } from '@site/src/plugins/extractQuestions'

interface Question {
  subject: string;
  topic: string;
  title: string;
  link: string;
}

interface NumberedTopic {
  number: number;
  name: string;
  questions: Question[];
}

interface NumberedDomain {
  number: number;
  name: string;
  topics: Record<string, NumberedTopic>;
}

function QuestionList () {
  const { questions = [], knowledgeMap = {} } = usePluginData('extract-questions-plugin') as { questions: Question[], knowledgeMap: KnowledgeMap }

  // 按 subject 和 topic 组织数据，并添加编号
  const organizedQuestions = questions.reduce((acc, question) => {
    const { subject, topic } = question
    // 兼容 topic 为数组
    const topicKey = Array.isArray(topic) ? topic.join('/') : topic

    // 如果是新的 subject，添加到最后面
    if (!acc[subject]) {
      const existingDomains = Object.values(acc)
      const nextNumber = existingDomains.length + 1
      acc[subject] = {
        number: nextNumber,
        name: subject,
        topics: {}
      }
    }

    // 如果是新的 topic，添加到最后面
    if (!acc[subject].topics[topicKey]) {
      const existingTopics = Object.values(acc[subject].topics)
      const nextNumber = existingTopics.length + 1
      acc[subject].topics[topicKey] = {
        number: nextNumber,
        name: topicKey,
        questions: []
      }
    }

    acc[subject].topics[topicKey].questions.push(question)
    return acc
  }, {} as Record<string, NumberedDomain>)

  // 新增：根据 topic 数组和 knowledgeMap 获取主题 name
  function getTopicNames (subject: string, topic: string | string[]) {
    const names: string[] = []
    const node = knowledgeMap[subject]
    if (!node) return []
    if (Array.isArray(topic)) {
      let cur = node
      for (const t of topic) {
        if (cur.children && cur.children[t]) {
          names.push(cur.children[t].name)
          cur = cur.children[t]
        } else {
          names.push(t)
          break
        }
      }
    } else {
      if (node.children && node.children[topic]) {
        names.push(node.children[topic].name)
      } else {
        names.push(topic)
      }
    }
    return names
  }

  // 优化的瀑布流分配算法
  const distributeTopics = (topics: Record<string, NumberedTopic>) => {
    const topicEntries = Object.entries(topics)
      .sort((a, b) => a[1].number - b[1].number)

    const columns = [[], [], []] as [string, NumberedTopic][][]
    const columnHeights = [0, 0, 0]
    const COLUMNS = 3

    const estimateTopicHeight = (topic: NumberedTopic) => {
      return 20 + 16 + (topic.questions.length * 32)
    }

    // 计算列高度方差
    const calculateVariance = (heights: number[]) => {
      const avg = heights.reduce((a, b) => a + b, 0) / heights.length
      return heights.reduce((acc, h) => acc + Math.pow(h - avg, 2), 0) / heights.length
    }

    // 检查放置是否合法
    const isValidPlacement = (topic: NumberedTopic, colIndex: number) => {
      const currentCol = columns[colIndex]
      if (currentCol.length > 0 && currentCol[currentCol.length - 1][1].number >= topic.number) {
        return false
      }

      // 检查左侧列的约束
      for (let i = 0; i < colIndex; i++) {
        const leftCol = columns[i]
        if (leftCol.length === 0) continue
        if (leftCol[leftCol.length - 1][1].number >= topic.number) {
          return false
        }
      }

      return true
    }

    // 第一轮：前三个 topic 直接从左到右放置
    topicEntries.slice(0, COLUMNS).forEach(([key, topic], index) => {
      const topicHeight = estimateTopicHeight(topic)
      columns[index].push([key, topic])
      columnHeights[index] += topicHeight
    })

    // 后续轮次：考虑高度均衡
    topicEntries.slice(COLUMNS).forEach(([key, topic]) => {
      const topicHeight = estimateTopicHeight(topic)
      let bestColumn = -1
      let minVariance = Infinity

      // 遍历所有列，寻找最佳放置位置
      for (let i = 0; i < COLUMNS; i++) {
        if (isValidPlacement(topic, i)) {
          const newHeights = [...columnHeights]
          newHeights[i] += topicHeight
          const variance = calculateVariance(newHeights)

          // 优先选择左边的列，除非方差差异显著（比如超过 20%）
          if (bestColumn === -1 ||
              variance < minVariance * 0.8) { // 允许 20% 的方差容忍度
            minVariance = variance
            bestColumn = i
          }
        }
      }

      if (bestColumn !== -1) {
        columns[bestColumn].push([key, topic])
        columnHeights[bestColumn] += topicHeight
      }
    })

    return columns
  }

  return (
    <div className="api-reference">
      {Object.entries(organizedQuestions)
        .sort((a, b) => a[1].number - b[1].number)
        .map(([domainKey, subject]) => (
          <div key={domainKey} className="subject-section">
            <h1 className="subject-title">
              {subject.number}.{knowledgeMap[domainKey]?.name || subject.name}
            </h1>
            <div className="topics-container">
              {distributeTopics(subject.topics).map((columnTopics, columnIndex) => (
                <div key={columnIndex} className="topics-column">
                  {columnTopics.map(([topicKey, topic]) => (
                    <div key={topicKey} className="topic-block">
                      <h2 className="topic-title">
                        <a target="_blank" href={topic.questions[0]?.link?.split('#')[0]} rel="noreferrer">
                          {topic.number}.{getTopicNames(domainKey, Array.isArray(topic.questions[0]?.topic) ? topic.questions[0].topic : [topic.questions[0]?.topic]).join(' / ')}
                        </a>
                      </h2>
                      <div className="question-list-container">
                        <ul className="question-list">
                          {topic.questions.map((question) => (
                            <li key={question.title} className="question-item">
                              <a target="_blank" href={question.link} rel="noreferrer">
                                {question.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default QuestionList
