import React, { useEffect, useRef } from 'react'
import './Modal.css'
import { createRoot, Root } from 'react-dom/client'

interface ModalProps {
   title: () => React.ReactNode
   content: () => React.ReactNode
   onClose: () => void
   onConfirm: () => void
   onCancel: () => void
   confirmText?: string
   cancelText?: string
   closeOnClickMask?: boolean
}

function Modal (props: ModalProps) {
  const { closeOnClickMask = true } = props
  const maskRef = useRef<HTMLDivElement>(null)

  // 让遮罩获取焦点以便监听 Escape
  useEffect(() => {
    maskRef.current?.focus()
  }, [])

  return (
      <div
         ref={maskRef}
         className="modal-mask"
         tabIndex={-1}
         onClick={e => {
           if (!closeOnClickMask) return
           if (e.target === e.currentTarget) props.onClose()
         }}
         onKeyDown={e => {
           if (e.key === 'Escape') props.onClose()
         }}
         aria-hidden={false}
      >
         <div className="modal" role="dialog" aria-modal="true">
            <span
               className="close"
               onClick={props.onClose}
            >
               &times;
            </span>
            <div className="modal-title">
               {props.title()}
            </div>
            <div className="modal-content">
               {props.content()}
            </div>
            <div className="modal-footer">
               <button className="modal-confirm" onClick={props.onConfirm}>
                  {props.confirmText || '确定'}
               </button>
               <button className="modal-cancel" onClick={props.onCancel}>
                  {props.cancelText || '取消'}
               </button>
            </div>
         </div>
      </div>
  )
}

interface OpenOptions {
   title?: React.ReactNode | (() => React.ReactNode)
   content?: React.ReactNode | (() => React.ReactNode)
   onClose?: () => void
   onConfirm?: () => void
   onCancel?: () => void
   confirmText?: string
   cancelText?: string
   closeOnClickMask?: boolean
   container?: HTMLElement
}

// React 18/19 open API
export function open (options: OpenOptions = {}) {
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
  } = options

  const host = document.createElement('div')
  container.appendChild(host)
  const root: Root = createRoot(host)

  let disposed = false

  const dispose = () => {
    if (disposed) return
    disposed = true
    // 卸载并移除节点
    root.unmount()
    host.remove()
  }

  const _onClose = () => { onClose?.(); dispose() }
  const _onConfirm = () => { onConfirm?.(); dispose() }
  const _onCancel = () => { onCancel?.(); dispose() }

  root.render(
      <Modal
         title={typeof title === 'function' ? title : () => title}
         content={typeof content === 'function' ? content : () => content}
         onClose={_onClose}
         onConfirm={_onConfirm}
         onCancel={_onCancel}
         confirmText={confirmText}
         cancelText={cancelText}
         closeOnClickMask={closeOnClickMask}
      />
  )

  return { close: dispose }
}

export { Modal }
