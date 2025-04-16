/**
 * 前端表单验证
 */
// 抽象处理者
class Validator {
  constructor () {
    this.nextValidator = null
  }

  setNext (validator) {
    this.nextValidator = validator
    return validator // 返回下一个验证器，便于链式调用
  }

  validate (input) {
    if (this.nextValidator) {
      return this.nextValidator.validate(input)
    }
    return true // 如果没有下一个验证器，则验证通过
  }
}

// 具体处理者：必填字段验证器
class RequiredValidator extends Validator {
  validate (input) {
    if (!input.value) {
      return { field: input.name, error: '此字段为必填项' }
    }
    return super.validate(input)
  }
}

// 具体处理者：邮箱验证器
class EmailValidator extends Validator {
  validate (input) {
    if (input.type === 'email' && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(input.value)) {
        return { field: input.name, error: '请输入有效的电子邮件地址' }
      }
    }
    return super.validate(input)
  }
}

// 具体处理者：密码长度验证器
class PasswordLengthValidator extends Validator {
  validate (input) {
    if (input.type === 'password' && input.value && input.value.length < 8) {
      return { field: input.name, error: '密码长度必须至少为8个字符' }
    }
    return super.validate(input)
  }
}

// 客户端代码
function validateForm (formData) {
  // 创建验证链
  const requiredValidator = new RequiredValidator()
  const emailValidator = new EmailValidator()
  const passwordValidator = new PasswordLengthValidator()

  requiredValidator
    .setNext(emailValidator)
    .setNext(passwordValidator)

  const errors = []

  // 对每一个表单字段进行验证
  for (const field of formData) {
    const result = requiredValidator.validate(field)
    if (result !== true) {
      errors.push(result)
    }
  }

  return errors
}

// 使用示例
const formData = [
  { name: 'username', type: 'text', value: '' },
  { name: 'email', type: 'email', value: 'invalid-email' },
  { name: 'password', type: 'password', value: 'pass' }
]

const validationErrors = validateForm(formData)
console.log(validationErrors)
// 输出：
// [
//   { field: 'username', error: '此字段为必填项' },
//   { field: 'email', error: '请输入有效的电子邮件地址' },
//   { field: 'password', error: '密码长度必须至少为8个字符' }
// ]
