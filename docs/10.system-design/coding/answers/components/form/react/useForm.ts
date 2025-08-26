import { useCallback, useMemo, useState } from 'react'

export type Validator = (value: any, values: Record<string, any>) => string | null | Promise<string | null>
export type Schema = Record<string, Validator[]>

export interface UseFormReturn {
  values: Record<string, any>
  errors: Record<string, string | null>
  setValue: (name: string, value: any) => Promise<void>
  validate: () => Promise<boolean>
}

export function useForm (initialValues: Record<string, any> = {}, schema: Schema = {}): UseFormReturn {
  const [values, setValues] = useState<Record<string, any>>(initialValues)
  const [errors, setErrors] = useState<Record<string, string | null>>({})

  const validators = useMemo(() => schema, [schema])

  const validateField = useCallback(async (name: string): Promise<string | null> => {
    const fns = validators[name] || []
    for (const fn of fns) {
      const res = await fn(values[name], values)
      if (res) return res
    }
    return null
  }, [validators, values])

  const setValue = useCallback(async (name: string, value: any) => {
    setValues(v => ({ ...v, [name]: value }))
    const err = await validateField(name)
    setErrors(e => ({ ...e, [name]: err }))
  }, [validateField])

  const validate = useCallback(async () => {
    const names = Object.keys(validators)
    const entries = await Promise.all(names.map(async n => [n, await validateField(n)] as const))
    const next: Record<string, string | null> = {}
    let ok = true
    for (const [n, err] of entries) {
      next[n] = err
      if (err) ok = false
    }
    setErrors(next)
    return ok
  }, [validateField, validators])

  return { values, errors, setValue, validate }
}

export const required = (msg = '必填项'): Validator => (v) => (v == null || v === '' ? msg : null)
export const email = (msg = '邮箱格式不正确'): Validator => (v) => (/^\S+@\S+\.\S+$/.test(String(v)) ? null : msg)
