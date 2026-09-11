import type { ReactNode } from 'react'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

type FeatureItem = {
  id: string
  title: string
  description: ReactNode
  icon: ReactNode
}

const FeatureList: FeatureItem[] = [
  {
    id: '01',
    title: '系统化知识图谱',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
        <path d="M6 14h6" />
      </svg>
    ),
    description: (
      <>
        按 18 大核心技术领域和专题系统编排，标注严苛的 P0 / P1 / P2 考察优先级，帮助精准聚焦大厂考核重难点。
      </>
    )
  },
  {
    id: '02',
    title: '金字塔深度解析',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
    description: (
      <>
        遵循“核心结论-原理剖析-工业级代码-面试官追问链”四层金字塔模型，配有交互沙箱与时序图，拒绝死记硬背。
      </>
    )
  },
  {
    id: '03',
    title: '全离线秒级检索',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="m11 8 3 3-3 3" />
      </svg>
    ),
    description: (
      <>
        内置高性能本地全文搜索引擎与体系看板，支持中英双语毫秒级精准检索与热词高亮，断网环境随时沉浸复习。
      </>
    )
  }
]

function Feature({ id, title, description, icon }: FeatureItem) {
  return (
    <div className={styles.feature}>
      <div className={styles.cardHeader}>
        <span className={styles.cardId}>{id}</span>
        <div className={styles.iconWrapper}>{icon}</div>
      </div>
      <Heading as="h3" className={styles.featureTitle}>
        {title}
      </Heading>
      <p className={styles.featureDesc}>{description}</p>
    </div>
  )
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      {FeatureList.map((props) => (
        <Feature key={props.id} {...props} />
      ))}
    </section>
  )
}
