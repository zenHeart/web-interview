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

    if (!acc[subject]) {
      acc[subject] = {
        number: Object.keys(acc).length + 1,
        name: subject,
        topics: {}
      }
    }

    if (!acc[subject].topics[topic]) {
      acc[subject].topics[topic] = { count: 0, questions: [] }
    }

    acc[subject].topics[topic].count += 1
    acc[subject].topics[topic].questions.push(question) // 保存问题以便后续使用

    return acc
  }, {} as Record<string, NumberedDomain>)

  return (
    <div className="home-questions-summary">
      {Object.entries(organizedQuestions)
        .sort((a, b) => a[1].number - b[1].number)
        .map(([domainKey, subject]) => (
          <div key={domainKey} className="subject-card">
            <h2 className="subject-title">{subject.name}</h2>
            <div className="wi-topics-container">
              {Object.entries(subject.topics).map(([topicKey, topic]) => (
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
