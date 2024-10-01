/**
 * 渲染 Vdom 结构
 * @param {string} tagName 标签名
 * @param {object} options 属性配置,可选
 * @param {array} children 子节点,可选
 */
function render (tagName, options, children) {
  if (
    typeof tagName !== 'string' ||
    typeof options !== 'object' ||
    !options ||
    !Array.isArray(children)
  ) {
    throw new TypeError('input error');
  }
}
