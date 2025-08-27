import React, { useState, useRef } from 'react'
import Chat, { Bubble, useMessages } from '@chatui/core'
import '@chatui/core/dist/index.css'
import styles from './index.module.css'
import ThinkingBlock from './messages/ThinkBlock'
import MarkdownContent from './messages/MarkdownContent'

interface MessageContent {
  text: string;
  thinking?: string;
}

const ChatWindow: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  // ChatUI v3 useMessages no longer returns setTyping; provide backward-compatible noop
  const msgTools = useMessages([])
  const { messages, appendMsg, updateMsg } = msgTools
  // Fallback to a no-op to avoid runtime errors if legacy calls remain
  const setTyping: (v: boolean) => void = (msgTools as any).setTyping || (() => {})

  // 处理发送消息
  const handleSend = async (type: string, val: string) => {
    if (type === 'text' && val.trim()) {
      // 添加用户消息
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right'
      })

      setTyping(true)

      try {
        // 添加一条空的助手消息，用于后续更新
        const assistantMsgId = Date.now().toString()
        appendMsg({
          _id: assistantMsgId,
          type: 'text',
          content: { text: '', thinking: '' }
        })

        // 调用 Ollama API
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'deepseek-r1:8b',
            prompt: val
          })
        })

        if (!response.body) throw new Error('No response body')

        const reader = response.body.getReader()
        let accumulatedText = ''
        let thinkingText = ''
        let isThinking = false
        let currentChunk = ''

        while (true) {
          const { value, done } = await reader.read()
          if (done) break

          const chunk = new TextDecoder().decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (!line) continue

            try {
              const data = JSON.parse(line)
              if (data.response) {
                currentChunk += data.response

                // 检查是否包含完整的思考标签
                if (currentChunk.includes('<think>')) {
                  const parts = currentChunk.split('<think>')
                  if (parts[0]) accumulatedText += parts[0]
                  currentChunk = parts[1] || ''
                  isThinking = true
                }

                if (currentChunk.includes('</think>')) {
                  const parts = currentChunk.split('</think>')
                  if (parts[0]) thinkingText += parts[0]
                  if (parts[1]) accumulatedText += parts[1]
                  currentChunk = ''
                  isThinking = false
                  continue
                }

                // 根据状态添加文本
                if (isThinking) {
                  thinkingText += currentChunk
                  currentChunk = ''
                } else {
                  accumulatedText += currentChunk
                  currentChunk = ''
                }

                // 只有当有内容时才更新消息
                if (accumulatedText.trim() || thinkingText.trim()) {
                  updateMsg(assistantMsgId, {
                    type: 'text',
                    content: {
                      text: accumulatedText.trim(),
                      thinking: thinkingText.trim()
                    }
                  })
                }
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
          content: { text: '抱歉，发生了一些错误，请稍后重试。' }
        })
      } finally {
        setTyping(false)
      }
    }
  }

  // 修改消息渲染组件
  const renderMessageContent = (msg: any) => {
    const { content } = msg
    return (
      <div>
        {content.thinking && <ThinkingBlock content={content.thinking} />}
        {content.text && <MarkdownContent content={content.text} />}
      </div>
    )
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
