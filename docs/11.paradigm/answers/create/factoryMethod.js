/**
 * 典型场景：根据类型动态创建不同组件（如表单字段组件）
 */
// 表单控件工厂
class FieldFactory {
  static createField (type) {
    switch (type) {
      case 'text':
        return new TextField()
      case 'select':
        return new SelectField()
      default:
        throw new Error('Unsupported field type')
    }
  }
}

class TextField {
  render () {
    return '<input type="text" />'
  }
}

class SelectField {
  render () {
    return '<select><option>Option</option></select>'
  }
}

// 使用
const field = FieldFactory.createField('select')
console.log(field.render())
