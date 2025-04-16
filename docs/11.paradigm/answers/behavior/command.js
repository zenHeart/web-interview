/**
 * 命令模式
 *
 * 实现编辑器的撤销/重做功能。
 * 将操作封装为对象，支持撤销、重做和日志记录。
 */

// 命令接口
class Command {
  execute () {}
  undo () {}
}

// 具体命令：添加文本
class AddTextCommand extends Command {
  constructor (editor, text) {
    super()
    this.editor = editor
    this.text = text
  }

  execute () {
    this.editor.addText(this.text)
  }

  undo () {
    this.editor.deleteText(this.text.length)
  }
}

// 具体命令：清空文本
class ClearTextCommand extends Command {
  constructor (editor) {
    super()
    this.editor = editor
    this.previousText = ''
  }

  execute () {
    this.previousText = this.editor.getText()
    this.editor.clearText()
  }

  undo () {
    this.editor.setText(this.previousText)
  }
}

// 编辑器模拟
class Editor {
  constructor () {
    this.content = ''
  }

  addText (text) {
    this.content += text
  }

  deleteText (length) {
    this.content = this.content.slice(0, -length)
  }

  clearText () {
    this.content = ''
  }

  setText (text) {
    this.content = text
  }

  getText () {
    return this.content
  }
}

// 使用命令
const commandHistory = []
const editor = new Editor()

function executeCommand (command) {
  command.execute()
  commandHistory.push(command) // 记录命令
}

// 撤销操作
function undo () {
  const lastCommand = commandHistory.pop()
  if (lastCommand) lastCommand.undo()
}

// 示例操作
const addCommand = new AddTextCommand(editor, 'Hello, World!')
executeCommand(addCommand)
console.log(editor.getText()) // 输出: Hello, World!

const clearCommand = new ClearTextCommand(editor)
executeCommand(clearCommand)
console.log(editor.getText()) // 输出: (空字符串)

undo()
console.log(editor.getText()) // 输出: Hello, World!

undo()
console.log(editor.getText()) // 输出: (空字符串)
