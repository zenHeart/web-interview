function stringify (obj) {
  const type = typeof obj
  if (obj === null) {
    // 处理 null
    return 'null'
  }
  if (type === 'string') {
    // 处理字符串类型
    return `"${obj}"`
  }
  if (type === 'number' || type === 'boolean') {
    // 处理数字和布尔类型
    return String(obj)
  }
  if (Array.isArray(obj)) {
    // 处理数组
    const elements = obj.map(item => stringify(item))
    return `[${elements.join(',')}]`
  }
  // 处理对象
  const props = Object.keys(obj).map(key => {
    const value = stringify(obj[key])
    return `"${key}":${value}`
  })
  return `{${props.join(',')}}`
}

function parse (json) {
  return eval(`(${json})`)
}

export default {
  stringify,
  parse
}
