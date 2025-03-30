import { createLogger, add } from './utils'

const logger = createLogger('Vendor')
logger('计算器模块初始化')

export class Calculator {
    constructor() {
        this.logger = createLogger('Calculator')
        this.history = []
        this.logger('计算器实例已创建')
    }

    add(a, b) {
        const result = add(a, b)
        const operation = `${a} + ${b} = ${result}`
        this.history.push(operation)
        this.logger(`计算完成: ${operation}`)
        return result
    }

    getHistory() {
        return this.history
    }
}

logger('计算器模块加载完成')
