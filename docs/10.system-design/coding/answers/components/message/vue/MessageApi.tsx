import { h, Teleport, reactive, render } from 'vue'
import Message from './Message.vue'

type MessageType = 'info' | 'success' | 'warning' | 'error'

interface OpenOptions {
  type?: MessageType
  content?: string | (() => string)
  duration?: number
  container?: HTMLElement
  onClose?: () => void
}

function TeleportWrapper (props:any) {
  return h(Teleport, { to: props.to }, [
    h(Message, {
      type: props.type,
      content: props.content,
      duration: props.duration,
      onClose: props._onClose
    })
  ])
}

export function open (options: OpenOptions = {}) {
  const {
    type = 'info',
    content = '',
    duration = 2000,
    container = document.body,
    onClose
  } = options

  const state = reactive({
    to: container,
    type,
    content,
    duration,
    _onClose: () => { dispose(); onClose?.() }
  })

  const host = document.createElement('div')
  container.appendChild(host)

  const dispose = () => { render(null, host); host.remove() }

  render(h(TeleportWrapper, state), host)
  return { close: dispose }
}

export const info = (content?: OpenOptions['content'], duration?: number) => open({ type: 'info', content, duration })
export const success = (content?: OpenOptions['content'], duration?: number) => open({ type: 'success', content, duration })
export const warning = (content?: OpenOptions['content'], duration?: number) => open({ type: 'warning', content, duration })
export const error = (content?: OpenOptions['content'], duration?: number) => open({ type: 'error', content, duration })
