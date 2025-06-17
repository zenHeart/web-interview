import type { ReactNode } from 'react'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

type FeatureItem = {
   title: string;
   description: ReactNode;
   icon: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '内容系统梳理',
    icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            data-id="35"
         >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
         </svg>
    ),
    description: (
         <>
            按知识领域和专题系统整理面试题，配有优先级，帮助高效定位重点难点。
         </>
    )
  },
  {
    title: '详尽答案解析',
    icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            data-id="40"
         >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
            <path d="M10 9H8"></path>
            <path d="M16 13H8"></path>
            <path d="M16 17H8"></path>
         </svg>
    ),
    description: (
         <>
            每道题均配有详细解析、延伸阅读及相关题目，助力深入理解与拓展。
         </>
    )
  },
  {
    title: '在线互动编辑',
    icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            data-id="45"
         >
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
         </svg>
    ),
    description: (
         <>
            所有内容均可在线编辑，方便社区共建与个性化学习，提升参与感。
         </>
    )
  }
]

function Feature ({ title, description, icon }: FeatureItem) {
  return (
      <div className={styles.feature}>
         <div>{icon}</div>
         <Heading as="h3">{title}</Heading>
         <p>{description}</p>
      </div>
  )
}

export default function HomepageFeatures (): ReactNode {
  return (
      <section className={styles.features}>
         {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
         ))}
      </section>
  )
}
