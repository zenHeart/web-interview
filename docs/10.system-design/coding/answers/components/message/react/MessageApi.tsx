import React, { useEffect } from 'react'
import { createRoot, Root } from 'react-dom/client'
import './Message.css'

type MessageType = 'info' | 'success' | 'warning' | 'error'

interface MessageProps {
  type: MessageType
  content: () => React.ReactNode
  onClose: () => void
  duration: number
}

function Message (props: MessageProps) {
  useEffect(() => {
    const t = window.setTimeout(props.onClose, props.duration)
    return () => window.clearTimeout(t)
  }, [props.duration])
  return (
    <div className={`msg msg-${props.type}`} role="status" aria-live="polite">
      {props.content()}
      <button className="msg-close" onClick={props.onClose} aria-label="关闭">×</button>
    </div>
  )
}

interface OpenOptions {
  type?: MessageType
  content?: React.ReactNode | (() => React.ReactNode)
  duration?: number
  container?: HTMLElement
  onClose?: () => void
}

export function open (options: OpenOptions = {}) {
  const {
    type = 'info',
    content = '',
    duration = 2000,
    container = document.body,
    onClose
  } = options

  const host = document.createElement('div')
  container.appendChild(host)
  const root: Root = createRoot(host)

  let disposed = false
  const dispose = () => {
    if (disposed) return
    disposed = true
    root.unmount()
    host.remove()
    onClose?.()
  }

  root.render(
    <Message
      type={type}
      content={typeof content === 'function' ? (content as any) : () => content}
      duration={duration}
      onClose={dispose}
    />
  )

  return { close: dispose }
}

export const info = (content: OpenOptions['content'], duration?: number) => open({ type: 'info', content, duration })
export const success = (content: OpenOptions['content'], duration?: number) => open({ type: 'success', content, duration })
export const warning = (content: OpenOptions['content'], duration?: number) => open({ type: 'warning', content, duration })
export const error = (content: OpenOptions['content'], duration?: number) => open({ type: 'error', content, duration })
