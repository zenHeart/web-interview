import * as ModalApi from './ModalApi'

function App () {
  const open = () => {
    ModalApi.open({
      title: () => <h1>标题</h1>,
      content: () => <p>内容</p>,
      onClose: () => console.log('Modal closed'),
      onConfirm: () => console.log('Modal confirmed'),
      onCancel: () => console.log('Modal canceled')
    })
  }

  return (
      <button onClick={open}>API 弹窗</button>
  )
}

export default App
