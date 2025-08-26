import { reactive, render, Teleport, h, VNode } from 'vue'
import Modal from './Modal.vue'

interface OpenOptions {
   title?: string | (() => string | VNode)
   content?: string | (() => string | VNode)
   onClose?: () => void
   onConfirm?: () => void
   onCancel?: () => void
   confirmText?: string
   cancelText?: string
   closeOnClickMask?: boolean
   container?: HTMLElement
}

function TeleportWrapper (props) {
  return h(Teleport, { to: props.to }, [
    h(Modal, {
      show: props.show,
      confirmText: props.confirmText,
      cancelText: props.cancelText,
      closeOnClickMask: props.closeOnClickMask,
      onClose: props._onClose,
      onConfirm: props._onConfirm,
      onCancel: props._onCancel
    }, {
      title: () => (typeof props.title === 'function' ? props.title() : props.title),
      default: () => (typeof props.content === 'function' ? props.content() : props.content)
    })
  ])
}

export function open (options: OpenOptions) {
  const {
    title,
    content,
    onClose,
    onConfirm,
    onCancel,
    confirmText = '确定',
    cancelText = '取消',
    closeOnClickMask = true,
    container = document.body
  } = options || {}

  const state = reactive({
    to: container,
    show: true,
    title,
    content,
    confirmText,
    cancelText,
    closeOnClickMask,
    _onClose: () => { onClose?.(); dispose() },
    _onConfirm: () => { onConfirm?.(); dispose() },
    _onCancel: () => { onCancel?.(); dispose() }
  })

  const host = document.createElement('div')
  container.appendChild(host)

  const dispose = () => {
    state.show = false
    render(null, host)
    host.remove()
  }

  render(h(TeleportWrapper, state), host)
  return { close: dispose }
}
