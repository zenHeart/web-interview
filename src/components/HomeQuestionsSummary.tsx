import React from 'react'
import { usePluginData } from '@docusaurus/useGlobalData'
import './HomeQuestionsSummary.css'

interface Question {
  subject: string;
  topic: string;
  title: string;
  link: string;
}

interface NumberedDomain {
  number: number;
  name: string;
  topics: Record<string, { count: number; questions: Question[] }>;
}

const HomeQuestionsSummary: React.FC = () => {
  const { questions = [] } = usePluginData('extract-questions-plugin') as {
    questions: Question[];
  }

  // 按 subject 和 topic 组织数据，并计算每个 topic 的问题数量
  const organizedQuestions = questions.reduce((acc, question) => {
    const { subject, topic } = question
    // 兼容 topic 为数组
    const topicKey = Array.isArray(topic) ? topic.join('/') : topic

    if (!acc[subject]) {
      acc[subject] = {
        number: Object.keys(acc).length + 1,
        name: subject,
        topics: {}
      }
    }

    if (!acc[subject].topics[topicKey]) {
      acc[subject].topics[topicKey] = { count: 0, questions: [] }
    }

    acc[subject].topics[topicKey].count += 1
    acc[subject].topics[topicKey].questions.push(question)
    return acc
  }, {} as Record<string, NumberedDomain>)

  return (
    <div className="home-questions-summary">
      {Object.entries(organizedQuestions)
        .sort((a, b) => a[1].number - b[1].number)
        .map(([domainKey, subject]) => {
          const totalQuestions = Object.values(subject.topics).reduce(
            (sum, t) => sum + t.count,
            0
          )
          const formattedIndex = String(subject.number).padStart(2, '0')
          return (
            <div key={domainKey} className="subject-card">
              <div className="subject-header">
                <div className="subject-title-wrap">
                  <span className="subject-id">{formattedIndex}</span>
                  <h3 className="subject-title">{subject.name}</h3>
                </div>
                <span className="subject-count-badge">{totalQuestions} 题</span>
              </div>
              <div className="wi-topics-container">
                {Object.entries(subject.topics).map(([topicKey, topic]) => (
                  <a
                    key={topicKey}
                    className="topic-tag"
                    href={topic.questions[0]?.link}
                  >
                    <span className="topic-title">
                      {Array.isArray(topic.questions[0]?.topic)
                        ? topic.questions[0].topic.join(' / ')
                        : topic.questions[0]?.topic}
                    </span>
                    <span className="topic-count">{topic.count}</span>
                  </a>
                ))}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default HomeQuestionsSummary
