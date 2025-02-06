import { useState } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return createPortal(
      <div className="modal-overlay" onClick={onClose}>
         <div className="modal-content" onClick={e => e.stopPropagation()}>
            {children}
            <button onClick={onClose}>Close</button>
         </div>
      </div>,
      document.body
  )
}

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
      <div className="app">
         <h1>Modal Demo</h1>
         <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2>Modal Content</h2>
            <p>This is rendered using createPortal</p>
         </Modal>

         <style>{`
            .modal-overlay {
               position: fixed;
               top: 0;
               left: 0;
               right: 0;
               bottom: 0;
               background-color: rgba(0, 0, 0, 0.5);
               display: flex;
               justify-content: center;
               align-items: center;
            }

            .modal-content {
               background: white;
               padding: 20px;
               border-radius: 4px;
               max-width: 500px;
               width: 90%;
            }
         `}</style>
      </div>
  )
}

export default App
