import React from 'react'
import './QuestionList.css'
import { usePluginData } from '@docusaurus/useGlobalData'
import type { Question } from '../plugins/extractQuestions'

function QuestionList () {
  const { questions = [] } = usePluginData('extract-questions-plugin') as { questions: Question[] }

  // 按 domain 和 topic 组织数据
  const organizedQuestions = questions.reduce((acc, question) => {
    const { domain, topic } = question

    if (!acc[domain]) {
      acc[domain] = {}
    }

    const topicName = topic
    if (!acc[domain][topicName]) {
      acc[domain][topicName] = []
    }

    acc[domain][topicName].push(question)
    return acc
  }, {} as Record<string, Record<string, Question[]>>)

  return (
    <div className="api-reference">
      {Object.entries(organizedQuestions).map(([domain, topics]) => (
        <div key={domain} className="domain-section">
          <h1 className="domain-title">{domain}</h1>
          <div className="topics-container">
            {Object.entries(topics).map(([topic, topicQuestions]) => (
              <div key={topic} className="topic-block">
                <h2 className="topic-title">
                  <a href={topicQuestions[0]?.link?.split('#')[0]}>
                    {topic}
                  </a>
                </h2>
                <div className="question-list-container">
                  <ul className="question-list">
                    {topicQuestions.map((topicQuestion) => (
                      <li key={topicQuestion.title} className="question-item">
                        <a href={topicQuestion.link}>
                          {topicQuestion.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuestionList
