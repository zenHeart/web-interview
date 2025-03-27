class Template {
  constructor () {
    this.runtimeCode = `
(function(modules) {
  var installedModules = {};

  function __webpack_require__(moduleId) {
    if(installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }

    var module = installedModules[moduleId] = {
      exports: {}
    };

    modules[moduleId][0].call(module.exports, function(relativePath) {
      return __webpack_require__(modules[moduleId][1][relativePath]);
    }, module, module.exports);

    return module.exports;
  }

  return __webpack_require__(0);
})({
  __MODULES__
});`.trim()
  }

  renderModule (module) {
    const source = this._transformModuleSource(module.getSource())
    // 将 mapping 转换为相对路径到模块 ID 的映射，并去掉文件后缀
    const mapping = JSON.stringify(
      Object.fromEntries(
        Object.entries(module.mapping).map(([absolutePath, moduleId]) => {
          let relativePath = absolutePath.replace(module.context, '.')
          relativePath = relativePath.replace(/\.js$/, '') // 去掉文件后缀
          return [relativePath, moduleId]
        })
      )
    )
    return `
[
  function(require, module, exports) {
    ${source}
  },
  ${mapping}
]`.trim()
  }

  // 转换模块源码
  _transformModuleSource (source) {
    return source
      // 转换 import 语句
      .replace(
        /import\s*{\s*([\w\s,]+)}\s*from\s*['"]([^'"]+)['"]/g,
        (match, imports, path) => {
          const variables = imports
            .split(',')
            .map(name => name.trim())
            .join(', ')
          return `const { ${variables} } = require('${path}');`
        }
      )
      // 转换 export 语句
      .replace(
        /export\s+const\s+(\w+)\s*=\s*([^;]+)/g,
        'exports.$1 = $2'
      )
  }

  // 渲染所有模块
  renderModules (chunk) {
    const modules = chunk.getModules()
    return modules
      .map((module) => `${module.id}: ${this.renderModule(module)}`) // 使用模块 ID
      .join(',\n')
  }

  // 渲染最终代码
  render (chunk) {
    const modulesCode = this.renderModules(chunk)
    return this.runtimeCode.replace('__MODULES__', modulesCode)
  }
}

module.exports = Template
