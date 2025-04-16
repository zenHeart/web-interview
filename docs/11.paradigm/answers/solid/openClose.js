/**
 * 开放/封闭原则要求软件实体（如类、模块、函数）能够扩展，而不需要修改已存在的代码，以避免引入新的错误。
 * 通过使用继承或组合模式扩展现有类的功能，而非直接修改。
 *
 */

// 基础通知类
class Notifier {
  send (message) {
    console.log(`Sending: ${message}`)
  }
}

// 扩展：通过继承增加新的发送方式
class EmailNotifier extends Notifier {
  send (message) {
    // 复用基础逻辑，并扩展邮件发送的细节
    super.send(message)
    console.log(`Sending email with: ${message}`)
  }
}

const notifier = new EmailNotifier()
notifier.send('Hello World!')
