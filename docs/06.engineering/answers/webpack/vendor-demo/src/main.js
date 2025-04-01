import { createLogger } from './utils'
import { Calculator } from './vendor'

const logger = createLogger('Main')
logger('主模块开始初始化')

// 创建计算器实例
const calculator = new Calculator()
logger('计算器已创建')

// 暴露测试函数到全局
window.testAdd = function(a, b) {
  logger(`执行加法运算: ${a} + ${b}`)
  const result = calculator.add(a, b)
  logger(`计算结果: ${result}`)
  return result
}

logger('主模块加载完成，可以开始测试')
