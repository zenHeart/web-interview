/**
 * 策略模式
 * 表单验证策略动态切换。
 */
// 定义策略对象
const validationStrategies = {
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  passwordStrength: (value) => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value)
}

// 使用策略验证表单
function validateForm (strategy, value) {
  return validationStrategies[strategy](value)
}

// 示例：验证邮箱
const isEmailValid = validateForm('email', 'user@example.com')
console.log(`Email valid: ${isEmailValid}`) // true
