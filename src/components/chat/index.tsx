import React, { useState, useRef } from 'react'
import Chat, { Bubble, useMessages } from '@chatui/core'
import '@chatui/core/dist/index.css'
import styles from './index.module.css'

const ChatWindow: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { messages, appendMsg, setTyping, updateMsg } = useMessages([])

  // 处理发送消息
  const handleSend = async (type: string, val: string) => {
    if (type === 'text' && val.trim()) {
      // 添加用户消息
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      })

      setTyping(true)

      try {
        // 添加一条空的助手消息，用于后续更新
        const assistantMsgId = Date.now().toString()
        appendMsg({
          _id: assistantMsgId,
          type: 'text',
          content: { text: '' },
        })

        // 调用 Ollama API
        const response = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek-r1:8b',
            prompt: val,
          }),
        })

        if (!response.body) throw new Error('No response body')

        const reader = response.body.getReader()
        let accumulatedText = ''

        while (true) {
          const { value, done } = await reader.read()
          if (done) break

          // 将 Uint8Array 转换为文本
          const chunk = new TextDecoder().decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (!line) continue
            
            try {
              const data = JSON.parse(line)
              if (data.response) {
                accumulatedText += data.response
                // 更新助手消息
                updateMsg(assistantMsgId, {
                  type: 'text',
                  content: { text: accumulatedText },
                })
              }
            } catch (e) {
              console.error('JSON parse error:', e)
            }
          }
        }
      } catch (error) {
        console.error('Error calling Ollama:', error)
        // 显示错误消息
        appendMsg({
          type: 'text',
          content: { text: '抱歉，发生了一些错误，请稍后重试。' },
        })
      } finally {
        setTyping(false)
      }
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