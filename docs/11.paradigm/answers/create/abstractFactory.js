/**
 * 典型场景：根据主题生成一组相关的 UI 组件（按钮、输入框、弹窗）
 */
class DarkButton {
  render () {
    console.log('渲染深色主题按钮')
  }
}
class DarkInput {
  render () {
    console.log('渲染深色主题输入框')
  }
}
class LightButton {
  render () {
    console.log('渲染浅色主题按钮')
  }
}
class LightInput {
  render () {
    console.log('渲染浅色主题输入框')
  }
}

// 抽象工厂
class UIAbstractFactory {
  createButton () {}
  createInput () {}
}

// 深色主题工厂
class DarkThemeFactory extends UIAbstractFactory {
  createButton () {
    return new DarkButton()
  }

  createInput () {
    return new DarkInput()
  }
}

// 浅色主题工厂
class LightThemeFactory extends UIAbstractFactory {
  createButton () {
    return new LightButton()
  }

  createInput () {
    return new LightInput()
  }
}

// 使用
function renderTheme (factory) {
  const btn = factory.createButton()
  const input = factory.createInput()
  console.log(btn.render())
  console.log(input.render())
}

console.log('Rendering Dark Theme:')
const darkFactory = new DarkThemeFactory()
renderTheme(darkFactory)

console.log('Rendering Light Theme:')
const lightFactory = new LightThemeFactory()
renderTheme(lightFactory)
