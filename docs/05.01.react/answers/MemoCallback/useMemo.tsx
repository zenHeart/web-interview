import { useEffect, useState, useMemo, useCallback } from 'react'

function Tabs (props: { tabsData: { id: number, title: string }[], activeTab: number, label: string, onTabChange: (id: number) => void }) {
  useEffect(() => {
    console.log(` ${props.label} 触发重新渲染`)
  })
  return (
     <div>
       <h1>{props.label} {Date.now()}</h1>
       <div style={{ display: 'flex', gap: '10px' }}>
         {props.tabsData.map(tab => (
           <button key={tab.id} onClick={() => props.onTabChange(tab.id)} style={{ backgroundColor: props.activeTab === tab.id ? 'lightblue' : 'lightgray', cursor: 'pointer' }}>
             {tab.title}
           </button>
         ))}
       </div>
     </div>
  )
}

const TabsData = [
  { id: 1, title: 'Tab 1' },
  { id: 2, title: 'Tab 2' },
  { id: 3, title: 'Tab 3' }
]

export default function UseMemoExample () {
  const [count, setCount] = useState(0)
  const [activeTab, setActiveTab] = useState(1)

  const onTabChange = useCallback((id: number) => {
    setActiveTab(id)
  }, [])

  const newTabsInfo = {
    tabsData: TabsData,
    activeTab
  }
  const MemoizedTabs = useMemo(() => {
    return (
      <Tabs onTabChange={onTabChange} tabsData={TabsData} activeTab={activeTab} label='使用 useMemo'/>
    )
  }, [activeTab])

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count {count}</button>
      <Tabs onTabChange={onTabChange} {...newTabsInfo} label='未使用 useMemo' />
      {MemoizedTabs}
    </div>
  )
}
