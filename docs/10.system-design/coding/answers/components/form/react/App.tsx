import React from 'react'
import { useForm, required, email } from './useForm'

function App () {
  const form = useForm({ name: '', mail: '' }, {
    name: [required()],
    mail: [required(), email()]
  })

  return (
    <form onSubmit={async e => { e.preventDefault(); const ok = await form.validate(); console.log('valid:', ok, form.values, form.errors) }}>
      <div>
        <label>姓名</label>
        <input aria-invalid={!!form.errors.name} value={form.values.name || ''} onChange={e => form.setValue('name', e.target.value)} />
        {form.errors.name && <span role="alert">{form.errors.name}</span>}
      </div>
      <div>
        <label>邮箱</label>
        <input aria-invalid={!!form.errors.mail} value={form.values.mail || ''} onChange={e => form.setValue('mail', e.target.value)} />
        {form.errors.mail && <span role="alert">{form.errors.mail}</span>}
      </div>
      <button type="submit">提交</button>
    </form>
  )
}

export default App
