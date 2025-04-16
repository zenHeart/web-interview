/**
 * 里氏替换原则在前端开发中的一个典型用例是组件的替换。
 * 假设我们有一个基础按钮组件和它的子类组件，子类组件可以替换基础组件而不影响程序的行为。
 */

// 基础按钮组件
class Button {
  render () {
    console.log('Rendering a basic button')
  }
}

// 子类：提交按钮
class SubmitButton extends Button {
  render () {
    console.log('Rendering a submit button')
  }
}

// 子类：取消按钮
class CancelButton extends Button {
  render () {
    console.log('Rendering a cancel button')
  }
}

// 使用里氏替换原则
function renderButton (button) {
  button.render()
}

const basicButton = new Button()
const submitButton = new SubmitButton()
const cancelButton = new CancelButton()

// 替换基础按钮
renderButton(basicButton) // 输出: Rendering a basic button
renderButton(submitButton) // 输出: Rendering a submit button
renderButton(cancelButton) // 输出: Rendering a cancel button
