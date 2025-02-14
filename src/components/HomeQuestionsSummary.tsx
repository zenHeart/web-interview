import React from 'react'
import { usePluginData } from '@docusaurus/useGlobalData'
import './HomeQuestionsSummary.css'

interface Question {
  domain: string;
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

  // 按 domain 和 topic 组织数据，并计算每个 topic 的问题数量
  const organizedQuestions = questions.reduce((acc, question) => {
    const { domain, topic } = question

    if (!acc[domain]) {
      acc[domain] = {
        number: Object.keys(acc).length + 1,
        name: domain,
        topics: {}
      }
    }

    if (!acc[domain].topics[topic]) {
      acc[domain].topics[topic] = { count: 0, questions: [] }
    }

    acc[domain].topics[topic].count += 1
    acc[domain].topics[topic].questions.push(question) // 保存问题以便后续使用

    return acc
  }, {} as Record<string, NumberedDomain>)

  return (
    <div className="home-questions-summary">
      {Object.entries(organizedQuestions)
        .sort((a, b) => a[1].number - b[1].number)
        .map(([domainKey, domain]) => (
          <div key={domainKey} className="domain-card">
            <h2 className="domain-title">{domain.name}</h2>
            <div className="wi-topics-container">
              {Object.entries(domain.topics).map(([topicKey, topic]) => (
                <a
                  key={topicKey}
                  className="topic-tag"
                  target="_blank"
                  rel="noreferrer"
                  href={topic.questions[0]?.link} // 确保链接指向第一个问题
                >
                  {`${topicKey} (${topic.count})`}
                </a>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default HomeQuestionsSummary
