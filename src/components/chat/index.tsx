import React, { useState } from 'react'
import Chat, { Bubble, useMessages } from '@chatui/core'
import '@chatui/core/dist/index.css'
import styles from './index.module.css'

const ChatWindow: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { messages, appendMsg, setTyping } = useMessages([])

  // 处理发送消息
  const handleSend = (type: string, val: string) => {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      })

      setTyping(true)

      // 模拟回复
      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: '收到消息：' + val },
        })
      }, 1000)
    }
  }

  // 渲染消息内容
  const renderMessageContent = (msg: any) => {
    const { content } = msg
    return <Bubble content={content.text} />
  }

  return (
    <>
      {!isVisible && (
        <div className={styles.quickEntry} onClick={() => setIsVisible(true)}>
          <div className={styles.quickEntryInner}>
            <div className={styles.quickEntryIcon}>🤖</div>
            <div className={styles.quickEntryText}>点我体验</div>
          </div>
        </div>
      )}
      
      {isVisible && (
        <div className={styles.container}>
          <Chat 
            locale="zh-CN"
            navbar={{ 
              title: '智能助手',
              leftContent: {
                icon: 'close',
                onClick: () => setIsVisible(false)
              }
            }}
            messages={messages}
            renderMessageContent={renderMessageContent}
            onSend={handleSend}
          />
        </div>
      )}
    </>
  )
}

export default ChatWindow 