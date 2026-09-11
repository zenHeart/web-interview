import React from 'react'
import { usePluginData } from '@docusaurus/useGlobalData'
import Link from '@docusaurus/Link'
import type { KnowledgeMap } from '../plugins/extractQuestions'
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
  const { questions = [], knowledgeMap = {} } = usePluginData('extract-questions-plugin') as {
    questions: Question[];
    knowledgeMap: KnowledgeMap;
  }

  const getSubjectDisplayName = (subjectKey: string) => {
    return knowledgeMap[subjectKey]?.name || subjectKey
  }

  const getTopicDisplayName = (subjectKey: string, topic: string | string[]) => {
    const node = knowledgeMap[subjectKey]
    if (!node) {
      return Array.isArray(topic) ? topic.join(' / ') : topic
    }
    const topicArr = Array.isArray(topic) ? topic : [topic]
    let cur: any = node
    const names: string[] = []
    for (const t of topicArr) {
      if (cur?.children && cur.children[t]) {
        names.push(cur.children[t].name)
        cur = cur.children[t]
      } else {
        names.push(t)
      }
    }
    return names.join(' / ')
  }

  // 按 subject 和 topic 组织数据，并计算每个 topic 的问题数量
  const organizedQuestions = questions.reduce((acc, question) => {
    const { subject, topic } = question
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
          const firstQuestionLink = Object.values(subject.topics)[0]?.questions[0]?.link || '#'

          return (
            <div key={domainKey} className="subject-card">
              <div className="subject-header">
                <div className="subject-title-wrap">
                  <span className="subject-dot" />
                  <Link to={firstQuestionLink} className="subject-title-link">
                    <h3 className="subject-title">{getSubjectDisplayName(subject.name)}</h3>
                  </Link>
                </div>
                <Link to={firstQuestionLink} className="subject-count-badge">
                  <span>{totalQuestions} 题</span>
                  <span className="badge-arrow">→</span>
                </Link>
              </div>
              <div className="wi-topics-container">
                {Object.entries(subject.topics).map(([topicKey, topic]) => (
                  <Link
                    key={topicKey}
                    className="topic-tag"
                    to={topic.questions[0]?.link || '#'}
                  >
                    <span className="topic-title">
                      {getTopicDisplayName(subject.name, topic.questions[0]?.topic)}
                    </span>
                    <span className="topic-count">{topic.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default HomeQuestionsSummary
