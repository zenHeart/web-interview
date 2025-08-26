import { reactive } from 'vue'

export type Validator = (value: any, values: Record<string, any>) => string | null | Promise<string | null>
export type Schema = Record<string, Validator[]>

export function useForm (initialValues: Record<string, any> = {}, schema: Schema = {}) {
  const values = reactive({ ...initialValues }) as Record<string, any>
  const errors = reactive({}) as Record<string, string | null>

  const validateField = async (name: string) => {
    const fns = schema[name] || []
    for (const fn of fns) {
      const res = await fn(values[name], values)
      if (res) return res
    }
    return null
  }

  const setValue = async (name: string, v: any) => {
    (values as any)[name] = v
    errors[name] = await validateField(name)
  }

  const validate = async () => {
    let ok = true
    for (const n of Object.keys(schema)) {
      errors[n] = await validateField(n)
      if (errors[n]) ok = false
    }
    return ok
  }

  return { values, errors, setValue, validate }
}

export const required = (msg = '必填项'): Validator => (v) => (v == null || v === '' ? msg : null)
export const email = (msg = '邮箱格式不正确'): Validator => (v) => (/^\S+@\S+\.\S+$/.test(String(v)) ? null : msg)
