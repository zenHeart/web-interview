/**
 * 典型场景：动态构建复杂 UI 表单配置、图表配置、表格列配置
 */
// 构建器模式构造表格列配置
class TableBuilder {
  constructor () {
    this.columns = []
  }

  addColumn (title, key) {
    this.columns.push({ title, dataIndex: key })
    return this
  }

  addSortableColumn (title, key) {
    this.columns.push({ title, dataIndex: key, sortable: true })
    return this
  }

  build () {
    return this.columns
  }
}

// 使用
const columns = new TableBuilder()
  .addColumn('姓名', 'name')
  .addSortableColumn('年龄', 'age')
  .build()

console.log(columns)
