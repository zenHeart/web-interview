import React from 'react'
import './QuestionList.css'
import { usePluginData } from '@docusaurus/useGlobalData'

interface Question {
  domain: string;
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

function QuestionList() {
  const { questions = [] } = usePluginData('extract-questions-plugin') as { questions: Question[] }

  // 按 domain 和 topic 组织数据，并添加编号
  const organizedQuestions = questions.reduce((acc, question) => {
    const { domain, topic } = question
    
    // 如果是新的 domain，添加到最后面
    if (!acc[domain]) {
      const existingDomains = Object.values(acc)
      const nextNumber = existingDomains.length + 1
      acc[domain] = {
        number: nextNumber,
        name: domain,
        topics: {}
      }
    }
    
    // 如果是新的 topic，添加到最后面
    if (!acc[domain].topics[topic]) {
      const existingTopics = Object.values(acc[domain].topics)
      const nextNumber = existingTopics.length + 1
      acc[domain].topics[topic] = {
        number: nextNumber,
        name: topic,
        questions: []
      }
    }
    
    acc[domain].topics[topic].questions.push(question)
    return acc
  }, {} as Record<string, NumberedDomain>)

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
              variance < minVariance * 0.8) {  // 允许 20% 的方差容忍度
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
        .map(([domainKey, domain]) => (
          <div key={domainKey} className="domain-section">
            <h1 className="domain-title">
              {domain.number}.{domain.name}
            </h1>
            <div className="topics-container">
              {distributeTopics(domain.topics).map((columnTopics, columnIndex) => (
                <div key={columnIndex} className="topics-column">
                  {columnTopics.map(([topicKey, topic]) => (
                    <div key={topicKey} className="topic-block">
                      <h2 className="topic-title">
                        <a href={topic.questions[0]?.link?.split('#')[0]}>
                          {topic.number}.{topic.name}
                        </a>
                      </h2>
                      <div className="question-list-container">
                        <ul className="question-list">
                          {topic.questions.map((question) => (
                            <li key={question.title} className="question-item">
                              <a href={question.link}>
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
