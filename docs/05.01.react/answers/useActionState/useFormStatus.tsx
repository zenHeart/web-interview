import { useFormStatus } from 'react-dom'

function SubmitButton () {
  const { pending, data, method, action } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  )
}

export default function FormExample () {
  async function handleSubmit (formData: FormData) {
    // 处理表单提交
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('表单提交完成')
  }

  return (
    <form action={handleSubmit}>
      <input name="username" placeholder="用户名" />
      <input name="email" type="email" placeholder="邮箱" />
      <SubmitButton />
    </form>
  )
}
